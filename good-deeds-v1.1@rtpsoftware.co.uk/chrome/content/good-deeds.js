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
	visitAnimalRescueSite : false,
	visitRainforestSite: false,
	visitBreastCancerSite : false,
	visitChildHealthSite : false,
	visitLiteracySite : false,	
	visitHungerSite : false,	
	
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
		if (this.prefs.getPrefType("visitRainforestSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitRainforestSite = this.prefs.getBoolPref("visitRainforestSite");
		}
		
		if (this.prefs.getPrefType("visitAnimalRescueSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitAnimalRescueSite = this.prefs.getBoolPref("visitAnimalRescueSite");
		}
		
		if (this.prefs.getPrefType("visitBreastCancerSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitBreastCancerSite = this.prefs.getBoolPref("visitBreastCancerSite");
		}
		
		if (this.prefs.getPrefType("visitChildHealthSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitChildHealthSite = this.prefs.getBoolPref("visitChildHealthSite");
		}
		
		if (this.prefs.getPrefType("visitLiteracySite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitLiteracySite = this.prefs.getBoolPref("visitLiteracySite");
		}
		
		if (this.prefs.getPrefType("visitHungerSite") == this.prefs.PREF_BOOL)	 {	 
		 this.visitHungerSite = this.prefs.getBoolPref("visitHungerSite");
		}
		
		if (this.prefs.getPrefType("lastVisited") == this.prefs.PREF_STRING)	 {
		this.lastVisited = this.prefs.getCharPref("lastVisited").toLowerCase();
		}	
	},
	
	
	decide_what_to_display: function()
	{
		// check if tabs opened today
		if(this.compare_date())
		{
			// open tabs
			this.open_tabs();
			
			// update last run
			var Today = new Date;
			this.prefs.setCharPref("lastVisited", Today.toString());

		}
	},
	
	click_event: function()
	{
		

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
		// open sites in tabs
		if (this.visitAnimalRescueSite)
		{
			openUILinkIn('http://www.animalrescuesite.com', 'tab');
		}
		
		if (this.visitRainforestSite)
		{
			openUILinkIn('http://www.rainforestsite.com', 'tab');
		}
		
		if (this.visitBreastCancerSite)
		{
			openUILinkIn('http://www.breastcancersite.com', 'tab');
		}
		
		if (this.visitChildHealthSite)
		{
			openUILinkIn('http://www.childhealthsite.com', 'tab');		
		}
		
		if (this.visitLiteracySite)
		{
			openUILinkIn('http://www.literacysite.com', 'tab');
		}
		
		if (this.visitHungerSite)
		{
			openUILinkIn('http://www.thehungersite.com', 'tab');
		}
	}
}

// Install event handlers
window.addEventListener("load", function(e) { GoodDeeds.startup(); }, false);
window.addEventListener("unload", function(e) { GoodDeeds.shutdown(); }, false);