// Good Deeds by rtpHarry, rtp|software
// v1.0 - april 26th 2007 - initial release
// v1.1 - june 11th 2009 - added extra preferences - minimum launch time and delay days between popup

// todo:
//  v1.1 - delay 10 seconds to avoid google browser sync clash
//  v1.2 - set minimum time so it doesnt launch at a bad time, such as just before you goto school or get in office
//  v1.3 - add extra line to specify custom site to visit once a day

var GoodDeeds = {
	prefs: null,
	lastVisited: "",
	startTime: "",
	dayDelay: "",
	
	visitHungerSite : false,	
	visitBreastCancerSite : false,
	visitAnimalRescueSite : false,
	visitLiteracySite : false,	
	visitVeteransSite : false,	
	visitAutismSite : false,	
	visitDiabetesSite : false,	
	visitRainforestSite : false,
		
	startup: function()
	{
     // Register to receive notifications of preference changes 
     this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.gooddeeds.");
     this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
  	 this.prefs.addObserver("", this, false);
	 
	 // grab preferences
	 this.grab_preferences();
	 
 	 // decide if tabs should be opened
     this.decide_what_to_display();
	},
	
	shutdown: function()
	{
		this.prefs.removeObserver("", this);
	},
	
	observe: function(subject, topic, data)	
	{
		// update preferences stored locally
		this.grab_preferences();
	},
	
	grab_preferences: function()
	{
		// get several preferences now
		if (this.prefs.getPrefType("visitHungerSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitHungerSite = this.prefs.getBoolPref("visitHungerSite");
		}	
				
		if (this.prefs.getPrefType("visitBreastCancerSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitBreastCancerSite = this.prefs.getBoolPref("visitBreastCancerSite");
		}
		
		if (this.prefs.getPrefType("visitAnimalRescueSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitAnimalRescueSite = this.prefs.getBoolPref("visitAnimalRescueSite");
		}	

		if (this.prefs.getPrefType("visitLiteracySite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitLiteracySite = this.prefs.getBoolPref("visitLiteracySite");
		}
		
		if (this.prefs.getPrefType("visitVeteransSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitVeteransSite = this.prefs.getBoolPref("visitVeteransSite");
		}
		
		if (this.prefs.getPrefType("visitAutismSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitAutismSite = this.prefs.getBoolPref("visitAutismSite");
		}
		
		if (this.prefs.getPrefType("visitDiabetesSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitDiabetesSite = this.prefs.getBoolPref("visitDiabetesSite");
		}
		
		if (this.prefs.getPrefType("visitRainforestSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitRainforestSite = this.prefs.getBoolPref("visitRainforestSite");
		}
		
		if (this.prefs.getPrefType("lastVisited") == this.prefs.PREF_STRING) {
		 this.lastVisited = this.prefs.getCharPref("lastVisited").toLowerCase();
		}	
	},
	
	
	decide_what_to_display: function()
	{
		// check if tabs opened today
		if(true /*this.compare_date()*/)
		{
			// open tabs
			this.open_tabs();
					
			// update last run
			var Today = new Date;
			this.prefs.setCharPref("lastVisited", Today.toString());

		}
	},
	
	compare_date: function()
	{
		// get todays date
		var Today = new Date;
		Today.setHours(0);
		Today.setMinutes(0);
		Today.setSeconds(0);
		Today.setMilliseconds(0);
		
		// get last visited date
		var LastVisited = new Date(this.lastVisited);
		LastVisited.setHours(0);
		LastVisited.setMinutes(0);
		LastVisited.setSeconds(0);
		LastVisited.setMilliseconds(0);
				
		// compare dates
		if (Today > LastVisited)
		{
			//alert("Run, todays date = \n" + Today + "\n and last visited date = \n" + LastVisited);
			return true;
		}
		else
		{
			//alert("dont Run because todays date = \n" + Today + "\n and last visited date = \n" + LastVisited);
			return false;
		}
		
		//alert("bork");
		return false;
	},
	
	open_tabs: function()
	{
		function open_background_tab(siteUrl) {
			openLinkIn(siteUrl, 'tab', { inBackground: true });
		}
				
		// open sites in tabs
		if (this.visitHungerSite)
		{
			open_background_tab('http://www.thehungersite.com');
		}	
		
		if (this.visitBreastCancerSite)
		{
			open_background_tab('http://www.thebreastcancersite.com');
		}
		
		if (this.visitAnimalRescueSite)
		{
			open_background_tab('http://www.theanimalrescuesite.com');
		}
		
		if (this.visitLiteracySite)
		{
			open_background_tab('http://www.theliteracysite.com');
		}

		if (this.visitVeteransSite)
		{
			open_background_tab('http://www.theveteranssite.com');
		}

		if (this.visitAutismSite)
		{
			open_background_tab('http://www.theautismsite.com');
		}

		if (this.visitDiabetesSite)
		{
			open_background_tab('http://www.thediabetessite.com');
		}
		
		if (this.visitRainforestSite)
		{
			open_background_tab('http://www.therainforestsite.com');
		}
	} 
}

// Install event handlers
window.addEventListener("load", function(e) { GoodDeeds.startup(); }, false);
window.addEventListener("unload", function(e) { GoodDeeds.shutdown(); }, false);