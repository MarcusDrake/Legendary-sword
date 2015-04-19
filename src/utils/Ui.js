var dialogList = [];//[[20,20,"blacksmith","Thank You! But Our Princess Is In Another Castle!"], [40,20,"princess","ohh nooo!!!"]];

/*
addDialog(10,10,"Pelle","whooo");
addDialog(20,10,"Pelle2","whooo2");
addDialog(30,10,"Pelle3","whooo3");
addDialog(40,10,"Pelle4","whooo4");*/

function updatePositionDialog(x,y, name)
{
	for(i=0;i<dialogList.length;i++)
	{
		if(dialogList[i][2] == name)
		{
			dialogList[i][0] = x;
			dialogList[i][1] = y;
		}
	}

}
function addDialog(x,y,name,text)
{

	var found = false;
	for(i=0;i<dialogList.length;i++)
	{
		if(dialogList[i][2] == name)
		{
			dialogList[i][0] = x;
			dialogList[i][1] = y;
			dialogList[i][3] = text;
			found = true;
			break;
		}
	}
	
	if(found == false)
	{
		dialogList.push([x,y,name,text]);
	}
}

function removeDialog(name)
{
	for(i=0;i<dialogList.length;i++)
	{
		if(dialogList[i][2] == name)
		{
			dialogList.splice(i,1);
			return true;
		}
	}
	
	return false;
}
function drawTextBox(x,y,name,text)
{
	$("#textbox" + name).show();
	var xs = windowWidth/2+x*((windowHeight/38)/zoom) - sword.bodySword.GetPosition().x*((windowHeight/38)/zoom);
	var ys = windowHeight/2-y*((windowHeight/38)/zoom) + sword.bodySword.GetPosition().y*((windowHeight/38)/zoom);
	
  
	if($("#textbox" + name).length == 0) 
	{
		$( "#overlay" ).append( "<div id='textbox"+name+"' class='textbox' name='npctextbox'/>" );
	}
	
	
	$("#textbox" + name).css({ 'left': xs, 'top': ys});
	$("#textbox" + name).html(text);
	


	
}

function removeTextBox()
{

	$("[name=npctextbox]").hide();
}

function updateHealthBar(health, maxHealth)
{
	var hBar = $('.health-bar');
	//var bar = hBar.find('.health-bar-back');
    var hit = hBar.find('.health-hit');
	
	// calculate the percentage of the total width
    var hitWidth = ( health / maxHealth ) * 100 + "%";
    
	if( ( health / maxHealth ) * 100 < 0 ){
		hitWidth = "0%";
    }
	
    // show hit bar and set the width
    hit.css({'display':'block','width':hitWidth});
 //   hBar.data('value', newValue);
}

function updateDepressionBar(depression, maxDepression)
{
	var hBar = $('.depression-bar');
	var bar = hBar.find('.depression-bar-back');
    var hit = hBar.find('.depression-hit');
	
   
	// calculate the percentage of the total width
    var hitWidth = ( depression / maxDepression ) * 100 + "%";
    
	if( ( depression / maxDepression ) * 100 > 100 ){
		hitWidth = "100%";
    }
	
    // show hit bar and set the width
    hit.css({'display':'block','width':hitWidth});
}