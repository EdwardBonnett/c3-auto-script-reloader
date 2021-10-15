"use strict";

{
	const C3 = self.C3;

	C3.Plugins.EdwardBonnett_ScriptReload.Instance = class SingleGlobalInstance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst);
		}

		Release()
		{
			super.Release();
		}

		SaveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}

		LoadFromJson(o)
		{
			// load state for savegames
		}

		GetScriptInterfaceClass()
		{
			return self.IMySingleGlobalInstance;
		}
	};

	// Script interface. Use a WeakMap to safely hide the internal implementation details from the
	// caller using the script interface.
	const map = new WeakMap();

	self.IMySingleGlobalInstance = class IMySingleGlobalInstance extends self.IInstance {
		constructor()
		{
			super();

			// Map by SDK instance
			map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
		}

	};
}