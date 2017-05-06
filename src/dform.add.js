(function($)
{
    /*
    *   This is use to load the value; 
    *
    */
    $.initForm = function(options,formValue) {

    if(!options.type)options = $.extend({ "type" : "form" }, options);
    var tool = {};
    var initValue = function(options,formValue,parentFields){
        var parentField = parentFields || [];    
        var type = options.type;
	    if (!type) {
				throw "No element type given! Must always exist.";
        }
        switch (type)
        {
            case 'text':
            case 'password':
            case 'textarea':
            case 'hidden':
            case 'select':
                if(options.name){
                    parentField.push(options.name);
                    options.value = $.getValueAt(formValue,parentField.join('.'));
                };
                break;
            case 'group':
                if(options.name){
                    parentField.push(options.name);
                };
                break;
            case 'set':
                if(options.name){
                    parentField.push(options.name);
                    options.addinit = {type:'group',name:'0',elements:options.elements,button:['delete']};
                    var value = $.getValueAt(formValue,parentField.join('.'));
                    var element =$.extend(true,[],options.elements);
                    var temp_element =[];
                    if( $.isArray(value)){
                        var max_index = 0;
                        for(var item in value){
                            max_index = parseInt(item) > max_index ? parseInt(item) : max_index;
                            element = $.extend(true,[],options.elements);
                            temp_element.push({type:'group',name:item,elements:element,button:['delete']}); 
                        }
                        options.addinit.name = max_index+1;
                        options.elements = temp_element;
                    }else{
                        temp_element.push({type:'group',name:'0',elements:element});
                        options.elements = temp_element;
                    }
                };
                break;
            default :
                break;
        }
        if(options.elements){
            for(var key in options.elements){
                options.elements[key] = initValue(options.elements[key],formValue,parentField);
            }
        }
        if(parentField[parentField.length-1]==options.name){
            parentField.pop();
        }
        return options;

        }
        return initValue(options,formValue,[]);
    }

    /*
    *  This is to make the form value as a map such as  name=Params[good]
    */
    $.dform.addType("group",function(options){
        var name = options.name;
        return $("<div>").dformAttr(options).addClass('name-line');
    });

    /*
    *  This is to make the form value as a array such as  name=Params[good][0][emailj]  anther :  name=Params[good][1][emailj]  
    */
    $.dform.addType("set",function(options){
        var set=$("<div>").dformAttr(options).addClass('name-line');
        options.addinit =  options.addinit || {type:'group',name:'0',elements:options.elements,button:['delete']};
        $('<a class="set-add-button">Add</a>').data('option',options.addinit).click(function(){
            var option = $(this).data('option');
            $(this).parent().formElement(option);
            option.name = parseInt(option.name)+1;
        }).appendTo(set);      
         return set;
    });
    
    $.dform.subscribe("button",
        function(options, type)
        {
            $('<a class="set-delete-button">Delete</a>').click(function(){
                $(this).parent().empty();
            }).prependTo($(this));
    });

    $.dform.subscribe("[post]",
        function(options, type){
            if(!$(this).hasClass('name-line') && $(this).attr('name')!=undefined){
                    var name = '';
                    var name_line = $(this).parents(".name-line");
                    var len = name_line.size()-1;
                    name_line.each(function(i,k){
                        name = (i==len?$(this).attr('name'):'['+$(this).attr('name')+']')+name;   
                    });
                    if(name !=''){
                        $(this).attr('name',name+'['+$(this).attr('name')+']');
                    }
            }
    });



})(jQuery);
