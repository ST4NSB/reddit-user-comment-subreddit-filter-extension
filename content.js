$(document).ready(function() {    
    $(".menuarea").append( "<div class='subreddit_filter_text'>filtered by: </div>" );
    $(".subreddit_filter_text").append("<select id='subreddit_filters'><option selected value='all'>all</option></select>");
    
    let user = $("#header-bottom-left > span").text();    
    let addressComments = "https://api.reddit.com/user/" + user + "/comments";
    let addressPosts = "https://api.reddit.com/user/" + user + "/submitted";
    let subredditsSet = new Set();
   
    
    $.ajax({
        headers:{ 
            "Accept":"application/json",
            "Content-type":"application/x-www-form-urlencoded"
        },   
        url: addressComments,
        success:function(response){            
            let comments = response.data.children;
            
            comments.forEach(function(entry) {
                let subreddit = entry.data.subreddit;
                if (!subredditsSet.has(subreddit)) {
                    subredditsSet.add(subreddit);
                    $("#subreddit_filters").append("<option value='" + subreddit + "'>" + subreddit + "</option>");
                }
            });
        }
      });
      
    $.ajax({
        headers:{ 
            "Accept":"application/json",
            "Content-type":"application/x-www-form-urlencoded"
        },   
        url: addressPosts,
        success:function(response){          
            let comments = response.data.children;
            
            comments.forEach(function(entry) {
                let subreddit = entry.data.subreddit;
                if (!subredditsSet.has(subreddit)) {
                    subredditsSet.add(subreddit);
                    $("#subreddit_filters").append(new Option(subreddit, subreddit));
                }
            });
        }
      });
      
    $('#subreddit_filters').change(function () {        
        var optionSelected = $(this).find("option:selected");
        var valueSelected  = optionSelected.val();
        
        $('div .thing').each(function () { 
            let subName = $(this).attr("data-subreddit");
            let comment = $(this);
            
            if (subName === undefined) {
                return;
            }
            
            if (valueSelected === "all") {
                comment.show();
                return; // this is equivalent of 'continue' for jQuery loop
            }
            
            if (valueSelected !== subName) {
                comment.hide();
            }
            else {
                comment.show();
            }
        });
    });
    
    $('#subreddit_filters').change(function(){
        let text = $(this).find('option:selected').text();
        let $aux = $('<select/>').append($('<option/>').text(text));
        $(this).after($aux);
        $(this).width($aux.width());
        $aux.remove();
    }).change();
});

