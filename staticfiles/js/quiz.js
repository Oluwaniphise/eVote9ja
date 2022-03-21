
 
 
// const pageUrl = window.location.href


// $(document).ready(function(){
//     $.ajax({
  
//       type: 'POST',
//       url:window.location.href,
      
//       success: function(dataresponse){
        
//         console.log(dataresponse);
//         fetch('http://localhost:8000/voters/').then(res => { 
//           return res.json();
//         })
//         .then(data => {
         
//           let data1 = "";
//           let quizBox =  document.getElementById('question-div');
         
        
//             data.forEach(el =>{
              
//                 quizBox.innerHTML +=
//               `
//               <div class="card container">
//                 <div class="card-title">
//                   <h1>Vote for ${el.question_post} </h1>
//                 </div>
                
//               `
              
//               el.choices.forEach(
//                 choice => {
//                   quizBox.innerHTML += `
//                   <div class="card-body container">
//                   <label for="${el.question_post}">
//                   <input class="" type="radio" id=${choice.id} name="${el.question_post}" value="${choice.id}" /> ${choice.choice_field} <br /><br />
        
//                   </label>
//                   </div>
//                 </div>
//                   `
        
//                 })
//               ;
        
        
              
            
//           });
//         }
        
//         ).catch(err => console.log(err));
            
          
//        },
  
//        failure: function(error) {
//          console.log(error);
           
//        }
  
//   });
//   });
    