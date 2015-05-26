$("#body").wysihtml5();

/**
 * triger delete href if result is true
 */
function deleteHref(result, href){
    if(result){
        this.location = href;
    }
}


/**
 * Get one adopter and show him in modal box
 */
function viewAdopter(id){
    jQuery.ajax({
        url: window.ADOPTER_URL,
        type: 'POST',
        data: {
            id: id
        },
        dataType: "json",
        success: function(result){
            var html = 
            "<b>ID: </b>"+result.id+"<br/>"+
            "<b>First Name: </b>"+result.first_name+"<br/>"+
            "<b>Last Name: </b>"+result.last_name+"<br/>"+
            "<b>Email: </b>"+result.mail+"<br/>"+
            "<b>Email Provider: </b>"+result.mail_provider+"<br/>"+
            "<b>IP: </b>"+result.ip+"<br/>"+
            "<b>Country: </b>"+result.country+"<br/>"+
            "<b>Country Code: </b>"+result.country_code+"<br/>"+
            "<b>Created: </b>"+result.created_date;
            bootbox.alert(html, "Adopter Details");
        }
    });
}


/**
 * Get one email templates and show it in modal box
 */
function viewEmailTemplate(id){
    jQuery.ajax({
        url: MAIL_TEMPLATE_URL,
        type: 'POST',
        data: {
            id: id
        },
        dataType: "json",
        success: function(result){
            var html =
            "<b>Subject</b><br/>"+result.subject+"<br/><br/>"+
            "<b>Body:</b><br/>"+result.body;
            bootbox.alert(html, "Mail Template");
        }
    });
}
            
            
/**
 * Send Email to the user_id, show choose template_mail view
 */
function sendMail(id){
    jQuery.ajax({
        url: SEND_MAIL_URL,
        type: 'GET',
        data: {
            id: id
        },
        dataType: "html",
        success: function(result){
            bootbox.alert(result, "Send Email");
        }
    });
}
            
            
            	    
function setLoder(div){
    div.html('<img src="'+LOADER_GIF+'" />');
}
	    
function unsetLoder(div){
    div.html('');
}
            
            
function setValueDisable(object){
    if($(object).val() == 'SMTP'){
        $('#smtp_host').removeAttr("disabled");
        $('#smtp_user').removeAttr("disabled");
        $('#smtp_password').removeAttr("disabled");
        $('#smtp_ssl-ssl').removeAttr("disabled");
        $('#smtp_ssl-tls').removeAttr("disabled");
        $('#smtp_port').removeAttr("disabled");
    }else{
        $('#smtp_host').attr("disabled", "disabled");
        $('#smtp_user').attr("disabled", "disabled");
        $('#smtp_password').attr("disabled", "disabled");
        $('#smtp_ssl-ssl').attr("disabled", "disabled");
        $('#smtp_ssl-tls').attr("disabled", "disabled");
        $('#smtp_port').attr("disabled", "disabled");
    }
}
            
            
function setWelcomeMail(object){
    if($(object).is(':checked') ){
        $('#welcome_mail_template_id').removeAttr("disabled");
    }else{
        $('#welcome_mail_template_id').attr("disabled", "disabled");
    }	
}
            
            
function setCaptchaType(object){
    if($(object).is(':checked') ){
        $('#captcha_type').removeAttr("disabled");
        $('#recaptcha_public_key').removeAttr("disabled");
        $('#recaptcha_private_key').removeAttr("disabled");
    }else{
        $('#captcha_type').attr("disabled", "disabled");
        $('#recaptcha_public_key').attr("disabled", "disabled");
        $('#recaptcha_private_key').attr("disabled", "disabled");
    }	
}

   
function setDefaultGoogleAccount(){
    $('#mail_methods').val('SMTP');
    $('#smtp_host').val("smtp.gmail.com");
    $('#smtp_port').val("587");
    $('#smtp_ssl-tls').attr('checked','checked');
				
    setValueDisable($('#mail_methods'));
    $("#gaup").show('slow');
}

function sendTestEmail(email){
    $('#errormsg').hide();
    $('#successmsg').hide();
		
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(email == '' || !emailReg.test(email)){
        $('#errormsg span').html('Invalid Email Address.');
        $('#errormsg').fadeIn('slow').fadeOut(200).fadeIn(100);
        return;
    }
		
    setLoder($("#loader"));
				
    jQuery.ajax({
        url: TEST_MAIL_URL,
        dataType: "json",
        data: {
            email: email
        },
        success: function(result){
            if(result.status=='OK'){
                $('#errormsg').hide();
                $('#successmsg').fadeIn('slow').fadeOut(200).fadeIn(100);
            }else{
                $('#errormsg span').html('Email could not be sent.');
                $('#errormsg').fadeIn('slow').fadeOut(200).fadeIn(100);
            }
            unsetLoder($("#loader"));
        }
    });
}
            
            
            
setCaptchaType($('#captcha_show'));
setWelcomeMail($('#welcome_mail_send'));
setValueDisable($('#mail_methods'));