

 
//  var submitBtn = document.querySelector('#submit');
//  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
//  console.log(csrftoken);

 
 
//  submitBtn.addEventListener('click', (e)=> {
//    e.preventDefault();
//      var choice = document.getElementsByName('choice');
//      user_choice = "";
//      for(i=0; i<choice.length; i++){ 
//          if (choice[i].type="radio"){
//              if(choice[i].checked){
//                  var user_answer = choice[i].value;
//                  user_choice = user_answer;
//                  console.log(user_choice);
//               }
          
//          }       
//        }
     
 
     
//      $.ajax({
 
//      type: 'POST',
//      url:"{% url 'vote' %}",
//      data:{
//          csrfmiddlewaretoken: csrftoken,
//          choice:user_choice,
         
//      },
//      success: function(data){
//           $('.question-div').hide()
//           $('.text-box').html("<h3> Your vote has been saved. Proceed. </h3>")
//           $('.pagination').show()
        
//            /* response message */
//          console.log(
//            "Successfully Voted"
//          );
//       },
 
//       failure: function(error) {
//         console.log(error);
          
//       }
 
//  });
 
// });

// var submit = document.getElementById('submit');
// var user_choice = document.getElementsByClassName('user_choice');
// var q = document.getElementsByName("{{q.id}}");
// var arr = [];
// submit.addEventListener('click', (e) => {

//     e.preventDefault();
//     for(i=0; i<user_choice.length; i++){ 
       
//             if (user_choice[i].type="radio"){
//                 if(user_choice[i].checked){
//                     var user_answer = `${user_choice[i].id} : ${user_choice[i].value}`;
//                     arr.push(user_answer);
               
//             }
//         }
    
//     }         
//     console.log(arr);   
//     console.log('okay')      
// });



// console.log("okay")


 

// const sendData = () => {
//     console.log('hi');
//     console.log(csrftoken)
//     var elements = [...document.getElementsByClassName('ans')];
    
//     const data = {};
//     data['csrfmiddlewaretoken'] = csrf[0].value;
//     elements.forEach(el => {
//       if(el.checked){
//         data[name] = el.value;
//       }else{
//         if(!data[el.name]){
//         data[el.name] = null;
//         }
//       }
  
//   })

//     $.ajax({
//       type:'POST',
//       url:"{% url 'save-quiz' %}",
//       data:data, 
//       success: function(response){
//         console.log(response)
//       }, 
//       error: function(error){
//         console.log(error)

//       },


//     });
// }



    $( document ).ready(function() {
        var base_color = "rgb(230,230,230)";
        var active_color = "rgb(237, 40, 70)";
        
        
        
        var child = 1;
        var length = $("section").length - 1;
        $("#prev").addClass("disabled");
        $("#submit").addClass("disabled");
        
        $("section").not("section:nth-of-type(1)").hide();
        $("section").not("section:nth-of-type(1)").css('transform','translateX(100px)');
        
        var svgWidth = length * 200 + 24;
        $("#svg_wrap").html(
          '<svg version="1.1" id="svg_form_time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
            svgWidth +
            ' 24" xml:space="preserve"></svg>'
        );
        
        function makeSVG(tag, attrs) {
          var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
          for (var k in attrs) el.setAttribute(k, attrs[k]);
          return el;
        }
        
        for (i = 0; i < length; i++) {
          var positionX = 12 + i * 200;
          var rect = makeSVG("rect", { x: positionX, y: 9, width: 200, height: 6 });
          document.getElementById("svg_form_time").appendChild(rect);
          // <g><rect x="12" y="9" width="200" height="6"></rect></g>'
          var circle = makeSVG("circle", {
            cx: positionX,
            cy: 12,
            r: 12,
            width: positionX,
            height: 6
          });
          document.getElementById("svg_form_time").appendChild(circle);
        }
        
        var circle = makeSVG("circle", {
          cx: positionX + 200,
          cy: 12,
          r: 12,
          width: positionX,
          height: 6
        });
        document.getElementById("svg_form_time").appendChild(circle);
        
        $('#svg_form_time rect').css('fill',base_color);
        $('#svg_form_time circle').css('fill',base_color);
        $("circle:nth-of-type(1)").css("fill", active_color);
        
         
        $(".button").click(function () {
          $("#svg_form_time rect").css("fill", active_color);
          $("#svg_form_time circle").css("fill", active_color);
          var id = $(this).attr("id");
          if (id == "next") {
            $("#prev").removeClass("disabled");
            if (child >= length) {
              $(this).addClass("disabled");
              $('#submit').removeClass("disabled");
            }
            if (child <= length) {
              child++;
            }
          } else if (id == "prev") {
            $("#next").removeClass("disabled");
            $('#submit').addClass("disabled");
            if (child <= 2) {
              $(this).addClass("disabled");
            }
            if (child > 1) {
              child--;
            }
          }
          var circle_child = child + 1;
          $("#svg_form_time rect:nth-of-type(n + " + child + ")").css(
            "fill",
            base_color
          );
          $("#svg_form_time circle:nth-of-type(n + " + circle_child + ")").css(
            "fill",
            base_color
          );
          var currentSection = $("section:nth-of-type(" + child + ")");
          currentSection.fadeIn();
          currentSection.css('transform','translateX(0)');
         currentSection.prevAll('section').css('transform','translateX(-100px)');
          currentSection.nextAll('section').css('transform','translateX(100px)');
          $('section').not(currentSection).hide();
        });
        
        });

