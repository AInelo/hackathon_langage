

// To add member 

document.addEventListener("DOMContentLoaded", function () {
    // event.preventDefault();
  
    var addMemberButton = document.getElementById('addMemberButton');
    var addMemberForm = document.getElementById('addMemberForm');
    var addMemberFormChild = document.getElementById('addMemberFormChild')
  
    addMemberButton.addEventListener('click', function () {
      if (addMemberForm.classList.contains("hidden")) {
        addMemberForm.classList.remove("hidden")
      }
      else {
        addMemberForm.classList.add("hidden")
      }
    })
  
    document.addEventListener('click', function (event) {
      if(event.target !== addMemberButton && !addMemberFormChild.contains(event.target)) {
        addMemberForm.classList.add('hidden')
      }
    })

  });
  