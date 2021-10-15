"use strict";

{
	const C3 = self.C3;

	C3.Plugins.EdwardBonnett_ScriptReload.Type = class SingleGlobalType extends C3.SDKTypeBase
	{
		constructor(objectClass)
		{
			super(objectClass);
		}

		Release()
		{
			super.Release();
		}

		OnCreate()
		{
		}
	};
}