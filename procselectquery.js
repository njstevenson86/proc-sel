// JavaScript Document
var connect, state, city, locName, street, zip, phone, procContact, email, fee, proctorLocation, proctorlist, locations, loc, CRM, CIC, listCRM, listCIC, stateselect, cityselect, formCheck, procId, proctorNum;

function proctorLocation(state, city, locName, street, zip, phone, procContact, email, fee, procId) {

	this.state = state,
	this.city = city,
	this.locName = locName,
	this.street = street,
	this.zip = zip,
	this.phone = phone,
	this.procContact = procContact,
	this.email = email,
	this.fee = fee,
	this.procId = procId;
	
}

var getLocation = function (state, city, loc) {
	"use strict";
	for (var i = 0, x = locations.length; i < x; i++) {
		if (locations[i].state === state && locations[i].city === city && locations[i].locName === loc) {
		$('#apprAddress').val(locations[i].street);
		$('#apprZip').val(locations[i].zip);
		$('#apprContact').val(locations[i].procContact);
		$('#apprEmail').val(locations[i].email); 
		$('#apprPhone').val(locations[i].phone);
		proctorNum = locations[i].procId;
		return proctorNum;
		}
	}
};

connect = new XMLHttpRequest();

connect.open('GET', 'proctorLocations.xml', false);
connect.setRequestHeader('Content-Type', 'text/xml');
connect.send(null); 

proctorlist = connect.responseXML;

locations = [];

var list = proctorlist.getElementsByTagName("listItem");
for (var i = 0, x = list.length; i < x; i++) {
		state = list[i].childNodes[1].firstChild.nodeValue;
		city = list[i].childNodes[3].firstChild.nodeValue;
		locName = list[i].childNodes[5].firstChild.nodeValue;
		street = list[i].childNodes[7].firstChild.nodeValue;
		zip = list[i].childNodes[9].firstChild.nodeValue;
		phone = list[i].childNodes[11].firstChild.nodeValue;
		procContact = list[i].childNodes[13].firstChild.nodeValue;
		email = list[i].childNodes[15].firstChild.nodeValue;
		fee = list[i].childNodes[17].firstChild.nodeValue; 
		procId = list[i].childNodes[19].firstChild.nodeValue;
	loc = new proctorLocation(state, city, locName, street, zip, phone, procContact, email, fee, procId);
	locations.push(loc);
	
}

var flags = [], states = "";
for (var i = 0, x = locations.length; i < x; i++) {
	if (flags[locations[i].state]) continue;
	flags[locations[i].state] = true;
	states += '<option value="' +locations[i].state+ '">' + locations[i].state + '</option>';
}

CIC = ["Agency Management", "Commercial Casualty", "Commercial Property", "Life & Health", "Personal Lines"];
CRM = ["Analysis of Risk", "Control of Risk", "Financing of Risk", "Practice of Risk", "Principles of Risk"];


for (var i = 0, x = CIC.length; i < x; i++) {
		listCIC += '<option value="' + CIC[i] + '">' + CIC[i] + '</option>';
}

for (var i = 0, x = CRM.length; i < x; i++) {
	listCRM += '<option value="' + CRM[i] + '">' + CRM[i] + '</option>';
}

		
$(document).ready(function() {
	"use strict";

	var proctorNum;
	
	$('#onlineClass').change(this.value, function() {
		if (this.value === 'CIC') {
			$('#classList').html(listCIC);
		}
		else if (this.value === 'CRM') {
			$('#classList').html(listCRM);
		}
	});
	
	$('#natid').on('input', function () {
		if ($(this).val().toString().length >= 6 && $(this).val().toString().length <= 7) 
			{ $(this).removeClass('invalid').addClass('valid'); } 
			else
			{ $(this).removeClass('valid').addClass('invalid'); }
	});
	
	$('#fname').on('input', function() {
		if ($(this).val()) 
			{ $(this).removeClass('invalid').addClass('valid');}
			else
			{$(this).removeClass('valid').addClass('invalid');
		}
	});
	
	$('#lname').on('input', function() {
		if ($(this).val())
			{ $(this).removeClass('invalid').addClass('valid');	}
			else
			{$(this).removeClass('valid').addClass('invalid');}
	});
	
	$('#examdate').on('input', function() {
		if ($(this).val())
			{ $(this).removeClass('invalid').addClass('valid');	}
			else
			{$(this).removeClass('valid').addClass('invalid');	}
	});
	
	$('#examtime').on('input', function() {
		if ($(this).val())
			{$(this).removeClass('invalid').addClass('valid');}
			else
			{$(this).removeClass('valid').addClass('invalid');}
	});
	
	$('#studentEmail').on('input', function() {
		var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			if(re.test($(this).val()))
				{$(this).removeClass("invalid").addClass("valid");}
				else
				{$(this).removeClass("valid").addClass("invalid");}
	});
	
	$('#apprState').on('input', function () {
		stateselect = $(this).val();
		var cFlags = [], cities = "";
			for (var i = 0, x = locations.length; i < x; i++) {
				if (locations[i].state === stateselect) {
					if (cFlags[locations[i].city]) continue; 
						cFlags[locations[i].city] = true;
						cities += '<option value="' +locations[i].city+ '">' + locations[i].city + '</option>';
					}
				}
		$('#appCityList').html(cities);
			if (stateselect) 
				{ $(this).removeClass('invalid').addClass('valid');}
				else
				{$(this).removeClass('valid').addClass('invalid');}
		return stateselect;
	});
	
	$('#proctype').change(this.value, function () {
		if (this.value === "ProctorU") {
			$('#examtype').html('<option value="Digital">Digital</option>');
			$('.proctor-stuff').hide();	
			$('#apprState').removeClass('invalid').addClass('valid');
			$('#apprCity').removeClass('invalid').addClass('valid');
			$('#apprLoc').removeClass('invalid').addClass('valid');
		}	
		else if (this.value === "approved") {
			$('#examtype').html('<option value="Digital">Digital</option><option value="Paper">Paper</option>');
			$('.proctor-stuff').show();
			$('#apprState').removeClass('valid').addClass('invalid');
			$('#apprCity').removeClass('valid').addClass('invalid');
			$('#apprLoc').removeClass('valid').addClass('invalid');
		}
	});
	
	$('#apprCity').on('input', function () {
		cityselect = $(this).val();
		var lFlags = [], locs = "";
			for (var i = 0, x = locations.length; i < x; i++) {
				if (locations[i].state === stateselect && locations[i].city === cityselect) {
					if (lFlags[locations[i].locName]) continue;
						lFlags[locations[i].locName] = true;
						locs += '<option value="' + locations[i].locName + '">' + locations[i].locName + '</option>';
					}
				}
				
		$('#apprLoc').html(locs);
		if (cityselect) 
			{ $(this).removeClass('invalid').addClass('valid');	}
			else
			{$(this).removeClass('valid').addClass('invalid');}
		
		if ($('#apprLoc').size() === 1) {
			getLocation(stateselect, cityselect, $('#apprLoc').val());
			}
		else
		{ return cityselect; }
			
	});
	
	$('#apprLoc').on('change', function() {
	if ($(this).val())
	{$(this).removeClass('invalid').addClass('valid');}
	else
	{$(this).removeClass('valid').addClass('invalid');}
	
	getLocation(stateselect, cityselect, $('#apprLoc').val());
	
	});
	
	$('#examdate').on('change', function() {	
	if ($(this).val()) 
		{$(this).removeClass('invalid').addClass('valid');} 
		else
		{$(this).removeClass('valid').addClass('invalid');}
	
	});
	
	$('#examtime').on('change', function() {
		if ($(this).val()) 
		{$(this).removeClass('invalid').addClass('valid');} 
		else
		{$(this).removeClass('valid').addClass('invalid');}
	});
	
	$('#sAgree').on('change', function() {
		if ($('#sAgree').is(':checked')) 
			{$('#agreement').removeClass('invalid').addClass('valid');}
			else
			{$('#agreement').removeClass('valid').addClass('invalid');}
	});
	
	$('#formReset').click(function() {
		var form_data= $('#procsubmission').serializeArray();
		for (var i = 0, x = form_data.length; i < x; i++) {
			if ($('#' + form_data[i].name).hasClass('valid')) {
				$('#' + form_data[i].name).removeClass('valid').addClass('invalid');
			}
		}
	$('#agreement').removeClass('valid').addClass('invalid');
	$('#procsubmission')[0].reset();

	});
	
	$('#formSub').click(function(event) {
		event.preventDefault();

		var form_data= $('#procsubmission').serializeArray(), errorFree = true;
			for (var i = 0, x = form_data.length; i < x; i++) {	
				if ($('#' + form_data[i].name).hasClass('invalid')) {
					errorFree = false; 
				}
			}
		if ($('#sAgree').prop('checked') === false || !$('#natid').val() || !$('#examdate').val() || !$('#examtime').val()) { errorFree = false; }

		if (!errorFree) { alert("Please make sure all fields are filled out correctly."); }
			else
			{
				if ($('#proctype').val() === "ProctorU") {
		
				formCheck = confirm("You have entered the following information: \n\nAlliance #: " + $('#natid').val() + "\nName: " + $('#fname').val() + " " + $('#lname').val() + "\nClass: " + $('#classList').val() + "\nExam Type: " + $('#examtype').val() + "\nProctor: ProctorU \nDate of Exam: " +  $('#examdate').val() + "\nTime of Exam: " + $('#examtime').val() + " " + $('#timezone').val() + "\n\nIf the above information is correct please click okay to submit.");
		
		if (formCheck === true) {
			$('#thewholething').hide();
			$('#ltext').show();

		$.ajax({
			type: 'POST',
			url:'sendProctor.php',
			data: {nacs: $('#natid').val(),
			vSfirstName: $('#fname').val(),
			vSlastName:  $('#lname').val(),
			vCourseName: $('#classList').val(),
			vTypeExam: $('#examtype').val(),
			vTestingCenter: "ProctorU",
			vContactName: "N/A",
			vPstreetAddress: "N/A",
			vExamDateTime: $('#examdate').val() + ' ' + $('#examtime').val() + ' ' + $('#timezone').val(),
			vPcity: "N/A",
			vPstate: "N/A",
			vPzip: "N/A",
			vPphoneNum: "N/A",
			vPemailAddress: "N/A",
			vSemailAddress: $('#studentEmail').val()},
			success: function() {
				$('#ltext').hide();
				$('#ftext').show();
			}
		});
				
		}
			
		} else if ($('#proctype').val() === "approved") {
	
		formCheck = confirm("You have entered the following information: \n\nAlliance #: " + $('#natid').val() + "\nName: " + $('#fname').val() + " " + $('#lname').val() + "\nClass: " + $('#classList').val() + "\nExam Type: " + $('#examtype').val() + "\nProctor: " + $('#apprLoc').val() + "\nContact: " + $('#apprContact').val() + "\nStreet Address: " + $('#apprAddress').val() + "\nCity & State: " + $('#apprCity').val() + ", " + $('#apprState').val() + "\nZip Code: " + $('#apprZip').val() + "\nProctor Phone: " + $('#apprPhone').val() + "\nProctor Email: " + $('#apprEmail').val() + "\nDate of Exam: " +  $('#examdate').val() + "\nTime of Exam: " + $('#examtime').val() + "\n\nIf the above information is correct please click okay to submit.");
	
	if (formCheck === true) {
			$('#thewholething').hide();
			$('#ltext').show();
			$.ajax({
				type: 'POST',
				url:'sendProctor.php',
				data: {nacs: $('#natid').val(),
				vSfirstName: $('#fname').val(),
				vSlastName:  $('#lname').val(),
				vCourseName: $('#classList').val(),
				vTypeExam: $('#examtype').val(),
				vProcId: proctorNum,
				vTestingCenter: $('#apprLoc').val(),
				vContactName: $('#apprContact').val(),
				vPstreetAddress: $('#apprAddress').val(),
				vExamDateTime: $('#examdate').val() + ' ' + $('#examtime').val() + ' ' + $('#timezone').val(),
				vPcity: $('#apprCity').val(),
				vPstate: $('#apprState').val(),
				vPzip: $('#apprZip').val(),
				vPphoneNum: $('#apprPhone').val(),
				vPemailAddress: $('#apprEmail').val(),
				vSemailAddress: $('#studentEmail').val()},
				success: function() {
					$('#ltext').hide();
					$('#ftext').show();
						}
					});
				}
			}
		}
	
	});
	
	
	$('#appStateList').html(states);
	$('#classList').html(listCIC);
	$('#examtype').html('<option value="Digital">Digital</option>');
});	

