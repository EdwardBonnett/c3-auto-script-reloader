"use strict";

{
	const SDK = self.SDK;

	const PLUGIN_CLASS = SDK.Plugins.EdwardBonnett_ScriptReload;

    const scriptFiles = {};

    let fileHandler = null;

    let project = null;

    let interval = null;

    let initialLoad = true;

    let logMessages = false;

	PLUGIN_CLASS.Instance = class MyCustomInstance extends SDK.IInstanceBase {
		constructor(sdkType, inst) {
			super(sdkType, inst);
            this.GetScriptFiles.bind(this);
		}

		Release() {
            if (interval) window.clearTimeout(interval);
		}

        GetFolderHandler (projectName) {
            return new Promise((resolve, reject) => {
                const storageRequest = window.indexedDB.open('localforage', 2);
                storageRequest.onerror = function() {
                    console.log('Script reload - Failed to access storage');
                    reject();
                };

                storageRequest.onsuccess = function(event) {
                    const db = event.target.result;
                    var transaction = db.transaction(['keyvaluepairs']);
                    var objectStore = transaction.objectStore('keyvaluepairs');
                    var request2 = objectStore.get('C3_RecentProjects');

                    request2.onerror = function() {
                        console.log('Script reload - No recent projects');
                        reject();
                    };

                    request2.onsuccess = async function(event) {
                        const project = request2.result.data.find(a => a.project === projectName && a.system === 'webfs-local-folder');
                        if (!project) reject();
                        resolve(project.ref.folderHandle);
                    }
                }
            });
        }

        async GetScriptFiles () {
            if (logMessages) console.log('Script reload - checking files');
            const instance = this._inst.GetProject().GetSingleGlobalObjectType('EdwardBonnett_ScriptReload');
            if (!instance) {
                if (logMessages) console.log('Script reload - plugin removed, stopping timer');
                this.Release();
                return;
            }
            try {
                for await (const folder of fileHandler.values()) {
                    if (folder.kind === 'directory' && folder.name === 'scripts') {
                        for await (const scriptFile of folder.values()) {
                            await scriptFile.getFile().then((file) => {
                                if (file.name.endsWith('.js') && (!scriptFiles[file.name] || scriptFiles[file.name] !== file.lastModified)) {
                                    scriptFiles[file.name] = file.lastModified;
                                    if (!initialLoad) {
                                        const blob = file.slice(0);
                                        if (logMessages) console.log('Script reload - ' + file.name + ' reloaded');
                                        project.AddOrReplaceProjectFile(blob, file.name, 'script');
                                    }
                                }
                            });
                        }
                    }
                }
                if (initialLoad) initialLoad = false;
            }
            catch (e) {
                console.log('couldn\'t reload scripts');
            }
        }

		async OnCreate() {
            project = this._inst.GetProject();
            const projectName = project.GetName();
            await this.GetFolderHandler(projectName).then((handler) => {
                fileHandler = handler;
            });
            if (!fileHandler) return;
            await this.GetScriptFiles();
            interval = window.setInterval(() => this.GetScriptFiles(), this._inst.GetPropertyValue('script-refresh'));
            logMessages = this._inst.GetPropertyValue('log-messages')
		}

		OnPropertyChanged(id, value) {
            if (id === 'script-refresh') {
                if (interval) window.clearTimeout(interval);
                if (value) interval = window.setInterval(() => this.GetScriptFiles(), value);
            }
            if (id === 'log-messages') {
                logMessages = value;
            }
		}

		LoadC2Property(name, valueString) {
			return false; // not handled
		}
	};
}