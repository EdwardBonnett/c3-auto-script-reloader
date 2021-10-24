"use strict";

{
	const C3 = self.C3;

	C3.Plugins.EdwardBonnett_VsCodePlugin = class SingleGlobalPlugin extends C3.SDKPluginBase
	{
		constructor(opts)
		{
			super(opts);
		}

		Release()
		{
			super.Release();
		}
	};
}