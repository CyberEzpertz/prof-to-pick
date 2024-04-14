'use server';

import { getClasses } from '@/lib/parser';

export const getTable = async () => {
  try {
    // const data = await response.text();
    // console.log(data);

    const table = getClasses(sampleHTML);
    // console.log(table);
    return table;
  } catch (e) {
    console.log(e);
  }
};

const sampleHTML = `

<!-- Header Start-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- COPYRIGHT NOTICE
Copyright 2001 DLSU Web Development Team and The IT Center. All Rights Reserved.
Obtain permission before copying some codes here over the Intranet or in any other medium.
Template Created 10/01/2000
Information Technology Center - Documentation Office
Date/Edition of Revision: February 2003/Second Edition, Build 002
Absolute URL: https://my.dlsu.edu.ph
//-->
<html>
<head>
<base target="_parent">
<title>My.LaSalle University Portal - Course Offerings</title>
<meta http-equiv="Expires" content="Tue, 25 Jul 1977 00:00:00">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="expires" content="0">
<meta name="description" content="My.Lasalle University Portal">
<meta name="copyright" content="Copyright©2001. All Rights Reserved. DLSU-Manila, Philippines">
<meta name="ms. category" content="Education">
<meta name="author" content="DLSU Web Development Team">
<meta name="MSSmartTagsPreventParsing" content="true">
<meta http-equiv="imagetoolbar" content="no">
<script language="JavaScript">
<!--
if ((navigator.appVersion.indexOf("Mac")!= -1)) {
		if ((navigator.appName.indexOf("Netscape")!= -1)) {
			document.write("<link rel='stylesheet' href='https://my.dlsu.edu.ph/styles/mlsmac_ns.css' type='text/css'>");
		} else {
			document.write("<link rel='stylesheet' href='https://my.dlsu.edu.ph/styles/mlsmac_ie.css' type='text/css'>");
		}
} else {
		if ((navigator.appName.indexOf("Netscape")!= -1)) {
 			document.write("<link rel='stylesheet' href='https://my.dlsu.edu.ph/styles/mlspc_ns.css' type='text/css'>");
		} else {
			document.write("<link rel='stylesheet' href='https://my.dlsu.edu.ph/styles/mlspc_ie.css' type='text/css'>");
		}
}
//-->
</script>
<script language="JavaScript">
<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
// -->
</script>
<link href="https://my.dlsu.edu.ph/_includes/mlscss.css" type="text/css" rel="stylesheet"></style><script type="text/javascript" src="https://my.dlsu.edu.ph/_includes/mlsjs.js"></script></head>

<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="focus()">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td bgcolor="#DCFEC5" background="https://my.dlsu.edu.ph/images/tmpl1/masthead_gradient2.gif"><img src="https://my.dlsu.edu.ph/images/tmpl1/masthead4.gif" alt="My.LaSalle University Portal" width="391" height="85" border="0" usemap="#mls_home"></td>
	<map name="mls_home">
  <area shape="rect" coords="161,22,294,77" href="https://my.dlsu.edu.ph" target="_parent" alt="Home">
</map>
    <td class="advsearch" bgcolor="#DCFEC5" background="https://my.dlsu.edu.ph/images/tmpl1/masthead_gradient2.gif" valign="bottom" align="right">
      <form name="myForm" action="https://search.atomz.com/search/" method="get" target="_blank">
        <img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="20" height="11"><br>
        <img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="18" height="11">
      </form>
    </td>
  </tr>
  <tr>
    <td colspan="2" bgcolor="#FFFF00"><img src="https://my.dlsu.edu.ph/images/tmpl1/lineart_yellow.gif" width="9" height="3"></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="3">
  <tr>
    <td align="center" bgcolor="#000000" class="templatenav">&nbsp;&nbsp;&nbsp;<a href="https://www.dlsu.edu.ph/legalities/copyright.asp"><b>Copyright &copy; DLSU-Manila</b></a></td>
    <td class="templatenav" bgcolor="#000000" align="right"> <b><a href="https://my.dlsu.edu.ph/about.asp">About
      My.LaSalle</a> | <a href="https://my.dlsu.edu.ph/features.asp">Features</a> | <a href="https://enroll.dlsu.edu.ph/dlsu/user_logout_p/">Log Out
      </a> | <a href="https://www.dlsu.edu.ph/calendar/" target="_blank"></a> <a href="https://www.dlsu.edu.ph/calendar/" target="_blank"></a><a href="https://my.dlsu.edu.ph/faq">FAQ
      </a> | <a href="https://www.dlsu.edu.ph/calendar/" target="_blank"></a><a href="https://my.dlsu.edu.ph/privacy_policy.asp">Privacy
      Policy</a> | <a href="https://my.dlsu.edu.ph/email_disclaimer.asp">Email Disclaimer</a><img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="21" height="11"></b></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td bgcolor="#FFFFFF" background="https://my.dlsu.edu.ph/images/tmpl1/masthead_shadow.gif"><img src="https://my.dlsu.edu.ph/images/tmpl1/masthead_shadow.gif" width="9" height="19"></td>
  </tr>
</table>
<!-- Header End -->
 
<table width="95%" border="0" cellspacing="0" cellpadding="0" align="center">
            <tr>
                <td bgcolor="#999999">
                    <table width="100%" border="0" cellspacing="1" cellpadding="1">
                        <tr>
                            <td bgcolor="#FFFFFF" valign="middle" height="50">
                            <p class="title"><img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="69" height="11">Course Offerings</p>
                            </td>
                        </tr>
<tr>
				<td bgcolor="#FFFFFF">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
<td align="RIGHT" class="logininfo">Today is Friday, April     12, 2024&nbsp;&nbsp;</td>
		</tr>
					</table>
				</td>
			</tr>
                <tr>
                              <td bgcolor="#FFFFFF">
                            <table width="100%" border="0" cellspacing="0" cellpadding="7">
                                  <tr>
                        <td valign="top">
<SCRIPT LANGUAGE="JavaScript">

		<!-- This script and many more are available free online at -->
		<!-- The JavaScript Source!! http://javascript.internet.com -->

		<!-- Begin


		// I have tried to show a multitude of different popup combinations below....

		var hmsg = new Array();

		hmsg["home"] = new helpmsg("Home Page",  "fancyheader", "plain", "");

		hmsg["forum"] = new helpmsg(
		"", "", "bold", " Check your internet bandwidth <a href=https://helpdesk.dlsu.edu.ph/facilities/internet/>here</a>.<br><br>Access will be slower especially when accessing secured/encrypted e-mail via a slow link - e.g., a dial-up line. Over a dial-up line in the Philippines, access to secure/encrypted e-mail is about seven times slower compared to standard e-mail.<br><br>A DSL access does not guarantee a high-speed access. If you experienced slow access and think that you are using a high-speed link, please e-mail our Help Desk at <a href=mailto:helpdesk@dlsu.edu.ph>helpdesk@dlsu.edu.ph</a> with the details of your location, time of day/night you experienced slow access, and access facility (i.e., dial-up, DSL, Internet Café, public hot spot, or office network).<br><br>You might want to use the standard e-mail if your Internet access is not fast enough.");

		hmsg["faq"] = new helpmsg("");

		hmsg["news"] = new helpmsg("", "", "", "");


		var myPopup = new helpbox("myPopup", hmsg, 700, 400, "#DCFEC5");

		// 700 is the width of the popup box
		// 400 is the height of the popup box
		// "#ffffee" is the color of the popup box

		function helpmsg(header, hstyle, mstyle, message)
		{
			this.DEFAULTHSTYLE = "plain";
			this.DEFAULTMSTYLE = "plain";

			this.header = header;
			if (hstyle) this.hstyle = hstyle;
			else this.hstyle = this.DEFAULTHSTYLE;
			this.message = message;
			if (mstyle) this.mstyle = mstyle;
			else this.mstyle = this.DEFAULTMSTYLE;
			return this;
		}
		new helpmsg();
		helpmsg.prototype.show = show;

		function show()
		{
		 	var H = "<FONT FACE='verdana'>" + this.header + "</FONT>";
			if (this.hstyle == "h1") H = "<H1>" + H + "</H1>";
			else if (this.hstyle == "h2") H = "<H2>" + H + "</H2>";
			else if (this.hstyle == "h3") H = "<H3>" + H + "</H3>";
			else if (this.hstyle == "h4") H = "<H4>" + H + "</H4>";
			if (this.hstyle == "fancyheader") H = "<table width='75%'>" +
			"<tr><td bgcolor='#DCFEC5' align='center' valign='center'>" +
			"<H1><FONT COLOR='white'>" + H +
			"</FONT></H1>" + "</td></tr></table>";
			else if (this.hstyle == "italics")
			H = "<I>" + H + "</I>";

			var M = "<FONT FACE='verdana' SIZE='2'>" + this.message + "</FONT>";
			if (this.mstyle == "plain") {}
			if (this.mstyle == "italics") M = M.italics();
			else if (this.mstyle == "") M = M.bold();

			var htmlpage = "";
			if (this.hstyle.indexOf("header")>=0)
			htmlpage = H + M;
			else htmlpage = H + "<BR>" + M;
			return htmlpage;
		}

		function helpbox(name, hm, width, height, bgcolor)
		{
		 	this.name = name;
			this.helpmessage = hm;
			this.timerHandle = null;
			this.windowHandle = null;
			this.DEFAULTWIDTH = 250;
			this.DEFAULTHEIGHT = 150;
			this.DEFAULTBGCOLOR = "#DCFEC5";
			this.POPUPDELAY = 100;
			if (width) this.width = width;
			else this.width = this.DEFAULTWIDTH;
			if (height) this.height = height;
			else this.height = this.DEFAULTHEIGHT;
			if (bgcolor) this.bgcolor = bgcolor;
			else this.bgcolor = this.DEFAULTBGCOLOR;
			return this;
		}
		function startHelp(msgindex)
		{
		 	var cmdstr="top." + this.name + ".showHelp('" + msgindex + "')";
			this.timerHandle = setTimeout(cmdstr, this.POPUPDELAY);
		}
		function showHelp(msgindex)
		{
		 	if (!this.windowHandle || !this.windowHandle.name || this.windowHandle.name=="")
			this.windowHandle = window.open(
							  				"",
											"subWindow",
											"toolbar=no," +
											"location=no," +
											"directories=no," +
											"status=no," +
											"menubar=no," +
											"scrollbars=yes," +
											"resizable=no," +
											"width=" + this.width + "," +
											"height=" + this.height
											);
			else
			this.windowHandle.focus();
			this.windowHandle.document.open();
			var to_page =
			"<HTML>\n" +
			"<BODY BGCOLOR='" + this.bgcolor + "'><P>" +
			this.helpmessage[msgindex].show() +
			"</BODY></HTML>\n";
			this.windowHandle.document.write(to_page);
			this.windowHandle.document.close();
		}
		function clearHelp()
		{
		 	clearTimeout(this.timerHandle);
			if (this.windowHandle && this.windowHandle.name)
			{
			this.windowHandle.close();
			this.windowHandle=null;
			}
		}
		new helpbox();
		helpbox.prototype.startHelp = startHelp;
		helpbox.prototype.showHelp = showHelp;
		helpbox.prototype.clearHelp = clearHelp;
		// End -->
		</script>

	<!-- Menu Start -->
	<table width="180" border="0" cellspacing="0" cellpadding="0">
	<tr><td class="menu"><b>Overview</b></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/about.asp">About My.LaSalle System</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/features.asp">Features Available</a></td></tr>
	<tr><td class="menu">&nbsp;</td></tr>
	<tr><td class="menu"><b>Help</b></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/procedures/">Guidelines &amp; Procedures</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/offices/accounting/payments/">Modes of Payment</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/faq/">Frequently Asked Questions</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/announcements/">Announcements</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/search/">Site Search</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/contactinfo.asp">Contact Us</a></td></tr>
	<tr><td class="menu">&nbsp;</td></tr>
	<tr><td class="menu"><b>Responsible Computing</b></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/pwd_standard.asp">Password Protection Standards</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/legalities/rc_response.asp">Policy for Responsible Computing</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/privacy_policy.asp">Privacy Policy</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/legalities/netusage.asp">DLSUnet Usage Policy</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://my.dlsu.edu.ph/email_disclaimer.asp">E-mail Disclaimer</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/legalities/guidelines.asp">User Responsibilities</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/legalities/ecce.asp">Electronic Community Citizenship Exam (ECCE)</a></td></tr>
	<tr><td class="menu">&nbsp;</td></tr>
	<tr><td class="menu"><b>Links</b></td></tr>
	<tr><td class="menu"> <p><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></p></td></tr>
	<tr><td class="menu"><a href="https://wise.dlsu.edu.ph" target="_blank">DLSU WISe</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/library/pulse/" target="_blank">Library Portal System (LPS)</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph/inside/video.asp" target="_blank">Videos about DLSU</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu"><a href="https://www.dlsu.edu.ph" target="_blank">DLSU-Manila Web Site</a></td></tr>
	<tr><td class="menu"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_menu.gif" width="178" height="5"></td></tr>
	<tr><td class="menu">&nbsp;</td></tr>
	</table>
	<!-- Menu End --> 
                        </td>
                        <td  valign="top" width="80%">&nbsp;
<p class="content_title">Second Trimester, AY 2023 - 2024
<BR>
<BR>
<BR>
<BR>
<FORM ACTION="view_course_offerings" METHOD="POST">
<TABLE  BORDER=0 ALIGN="CENTER">
<TR>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Class Nbr&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Course&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Section&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Day/s&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Time&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Room&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Enrl Cap&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Enrolled&nbsp&nbsp;</td>
<td align="center" class="data" bgcolor="#338000"><font color="#FFFFFF">
Remarks&nbsp&nbsp;</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2931</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>A58C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">REGADIO, CRISANTO  QUINOS</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS311&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">REGADIO, CRISANTO  QUINOS</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2932</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>A58D</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
43&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">REGADIO, CRISANTO  QUINOS</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS311&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">REGADIO, CRISANTO  QUINOS</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2116</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>A59C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
43&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL202&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2923</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>A59D</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS110&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2106</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>A60C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS226&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2924</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>A65C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS110&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>482</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>A65D</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DELOCARIO, MARTINA ROSE  PLACIDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ210&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DELOCARIO, MARTINA ROSE  PLACIDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2925</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>A66C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS226&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2107</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>A67C</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FROSH BLOCK / HYBRID&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS226&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2105</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>N01A</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
36&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FR/HYBRID     &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS226&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2104</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>N01B</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FR/HYBRID     &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS226&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DANGANAN, OMEGA DIADEM  TACTAQUIN</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2115</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>N02A</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FR/HYBRID     &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS331&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2112</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>XYA1</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
MRE304&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
43&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
31&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">ERA, MARLON  DE LUNA</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">ERA, MARLON  DE LUNA</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2111</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>XZB1</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
40&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
15&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2125</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y01</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG902&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
42&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2124</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y02</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG902&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2930</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y03</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2123</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y04</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS313&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">CATAGAN, ANGELIKA ASLEY  O.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">CATAGAN, ANGELIKA ASLEY  O.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2122</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y05</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS313&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">MENDOZA, KARL PATRICK  R.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2929</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y06</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ210&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2928</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y07</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ210&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2119</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y08</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL501&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2127</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y09</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL501&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">YOGYOG, LEAH CARISSA   A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">YOGYOG, LEAH CARISSA   A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2126</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y10</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL509&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">YOGYOG, LEAH CARISSA   A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">YOGYOG, LEAH CARISSA   A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2114</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y11</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
41&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">ASOR, BUBBLES BEVERLY  NEO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">ASOR, BUBBLES BEVERLY  NEO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2919</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y12</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">SO, KAREN  FRANDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2110</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y13</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL509&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2109</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y14</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
VL509&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
41&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2935</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y15</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ307&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
42&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2934</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y16</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ307&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2933</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y17</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ307&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">QUINTOS, MARK ANTHONY  MUJER</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>3190</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y18</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG1102&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2108</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y19</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ113&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DAGALEA, ALEXANDER  BUAL</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>3189</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Y20</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS109&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>3188</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Y21</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG709&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Hybrid        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NILLOS, BIEN ELI  PIANSAY</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2918</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z22</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NERI, SUSAN GRACE  TANA</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">NERI, SUSAN GRACE  TANA</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2270</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z23</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2946</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z24</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG1007&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2937</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z25</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG1102&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2118</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z26</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
43&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG709&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2117</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z27</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ211&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">JAYME, MARIA CARLA  A.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2936</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z28</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
M&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
H&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
SJ211&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">PARUNGAO, JOANNA EUNICE  V.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2927</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z29</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
FULLONLINE    &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DUAQUI, YELLOWBELLE  DEL MUNDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DUAQUI, YELLOWBELLE  DEL MUNDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2121</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z30</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG1102&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2120</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z31</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
44&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG1102&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">COLLADO, ZALDY  CASTRO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2926</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z32</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1245 - 1415&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS110&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">TITULAR, JOANA MARIE  MELGAR</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2113</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z33</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">LABAYO, CZARINA  CEBALLO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1430 - 1600&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS110&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">LABAYO, CZARINA  CEBALLO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>2103</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#0099CC"><B>Z34</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DELOCARIO, MARTINA ROSE  PLACIDO</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1615 - 1745&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS220&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">DELOCARIO, MARTINA ROSE  PLACIDO</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>481</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z35</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
T&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
41&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">FAYLONA, MARIE GRACE PAMELA  G.</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
F&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1800 - 1930&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
LS220&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">FAYLONA, MARIE GRACE PAMELA  G.</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2922</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z36</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
27&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0730 - 0900&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG902&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2921</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z37</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
42&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
0915 - 1045&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG902&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>2920</B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>GESTSOC </B>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
<FONT COLOR = "#006600"><B>Z38</B></FONT>&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
W&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
 &nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
45&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
39&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
HYBRID        &nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
<TR>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
S&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
1100 - 1230&nbsp&nbsp;</td>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
AG902&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
<td class="data">
&nbsp&nbsp;</td>
</TR>
<TR 1>
<td align="right" colspan=6 class="data">VELASCO, MARK ANTHONY  MANZON</td>
</TR>
</TABLE>
<BR>
<BR>
<CENTER>
<B>Classes of X sections will be held at DLSU-Laguna Campus.</B>
<BR>
<BR>
<BR>
</CENTER>
<FORM ACTION="view_course_offerings" METHOD="POST">
<DIV CLASS="content">
<TABLE  BORDER=0 ALIGN="CENTER" class="clear">
<TR>
<td class="data">
<font color="#0099CC" >BLUE&nbsp&nbsp;</td>
<td class="data">
Closed Section&nbsp&nbsp;</td>
</TR>
<TR>
<td class="data">
<font color="#006600" >GREEN&nbsp&nbsp;</td>
<td class="data">
Open Section&nbsp&nbsp;</td>
</TR>
</TABLE>
<HR>
<TABLE  BORDER=0 ALIGN="CENTER" class="clear">
<TR>
<td class="data" bgcolor="#D2EED3"><font align="center" color="#000000" >
Course&nbsp&nbsp;</td>
<td class="data">
<INPUT TYPE="text" NAME="p_course_code" SIZE="8" MAXLENGTH="8">&nbsp&nbsp;</td>
</TR>
</TABLE>
<TABLE  BORDER=0 ALIGN="CENTER" class="clear">
<TR>
<td class="data">
<INPUT TYPE="radio" NAME="p_option" VALUE="open">&nbsp&nbsp;</td>
<td class="data">
Open Sections&nbsp&nbsp;</td>
</TR>
<TR>
<td class="data">
<INPUT TYPE="radio" NAME="p_option" VALUE="closed">&nbsp&nbsp;</td>
<td class="data">
Closed Sections&nbsp&nbsp;</td>
</TR>
<TR>
<td class="data">
<INPUT TYPE="radio" NAME="p_option" VALUE="all" CHECKED>&nbsp&nbsp;</td>
<td class="data">
All Sections&nbsp&nbsp;</td>
</TR>
</TABLE>
<CENTER>
<INPUT TYPE="submit" NAME="p_button" VALUE="Search" CLASS="button">
<INPUT TYPE="reset" VALUE="Clear" CLASS="button">
</CENTER>
<INPUT TYPE="hidden" NAME="p_id_no" VALUE="12213423">
<INPUT TYPE="hidden" NAME="p_button" VALUE="Search">
</div></FORM>
</FORM>
</td>
</tr>
	   </table>
	   </td>
	   </tr>
	   </table>
	   </td>
	   </tr>
      </table>
	 

<!-- Footer Start -->
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="3"><img src="https://my.dlsu.edu.ph/images/tmpl1/spacer_footer.gif" width="12" height="6"></td>
  </tr>
  <tr>
    <td bgcolor="#029102" align="left" width="69">
      <p><img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="69" height="11"></p>
    </td>
    <td class="copyright" bgcolor="#029102" align="left" width="65%"><a href="http://www.dlsu.edu.ph/legalities/copyright.asp">Copyright&copy;2001.
      All Rights Reserved. De La Salle University-Manila</a></td>
    <td bgcolor="#029102" align="right" width="30%"><a href="javascript:history.back(1)"><img src="https://my.dlsu.edu.ph/images/tmpl1/backbttn.gif" width="17" height="23" alt="previous page" border="0"></a><a href="/"><img src="https://my.dlsu.edu.ph/images/tmpl1/homebttn.gif" width="23" height="23" border="0" alt="home"></a><a href="#top"><img src="https://my.dlsu.edu.ph/images/tmpl1/topbttn.gif" width="17" height="23" alt="go to top" border="0"></a><img src="https://my.dlsu.edu.ph/images/tmpl1/rightside_spacer.gif" width="69" height="11"></td>
  </tr>
  <tr bgcolor="#FFFF00">
    <td align="left" colspan="3"><img src="https://my.dlsu.edu.ph/images/tmpl1/lineart_yellow_2.gif" width="9" height="2"></td>
  </tr>
  <tr bgcolor="#000000">
    <td align="left"><a href="http://www.dlsu.edu.ph" target="_blank"><img src="https://my.dlsu.edu.ph/images/tmpl1/dlsulogo_footer.gif" alt="DLSU-Manila" width="93" height="61" border="0"></a></td>
    <td align="left" colspan="2">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="footer"><br>
            <!--This is best viewed with the latest versions of <a href="https://www.microsoft.com/windows/ie/" target="_blank">MS
            Internet Explorer</a> or <a href="https://channels.netscape.com/ns/browsers/" target="_blank">Netscape
            Gecko Series</a>.<br>
            You can set your video resolution to 800x600 pixels or higher (24
            bit color/32 bit) for best results.<br> <br> --!>
            Maintained and run by DLSU-Manila<br>
			DLSU My.LaSalle System Second Edition: February 04, 2003<br>
            You may send your <a href="/cdn-cgi/l/email-protection#0572606768647671607745616976702b6061702b756d">comments</a>
            to the <a href="http://www.dlsu.edu.ph/webteam/">Web Development Team</a>.<br><br>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script></body>
</html>
<!-- Footer End -->

`;
