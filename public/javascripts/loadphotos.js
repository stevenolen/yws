$.get("/photo", { wedding: 123}, function(json){
   var tbl_body = "";

   $.each(json.data, function(path){
       console.log(JSON.stringify(json.data));
       tbl_body += "<img src="+path+" />";
       })
   $('#am-container').html(tbl_body);
}
