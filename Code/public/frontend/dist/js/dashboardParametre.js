// ------------------   Logout API Call   -----------------------------------//
const logoutButton = document.querySelector(".logoutButton");
  // document.addEventListener("DOMContentLoaded", function () {
    logoutButton.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
        // Effectuer la requête Axios
        const response = await axios.get("/logout");
        // Gérer la réponse en cas de succès
        console.log("Déconnexion réussie :", response);
        // Rediriger l'utilisateur vers la page d'accueil ou toute autre page appropriée
        window.location.href = "/"; // Rediriger vers la page d'accueil
    } catch (error) {
        // Gérer l'erreur en cas d'échec de la déconnexion
        console.error("Erreur lors de la déconnexion :", error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
        alert("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
});






// function checkUserConnection() {
//   // Vérifiez si le cookie indiquant la connexion de l'utilisateur est présent
//   const isConnected = document.cookie.includes('userConnected=true');
//   console.log(isConnected);
//   return isConnected;
// }

// checkUserConnection();


const getDescription = async (id, table) => {
  const descriptionDOM = document.getElementById('descriptionDOM')

  try {
    const {
      data : {description},
    } = await axios.post('/api/v1/comptes/getdescription', {
      id : id,
      table: table
    })
    const descriptions = description.map((descrip) => {
      const {
          name,
        description
      } = descrip;

      return `<h1><u>Détail sur :</u> ${name}</h1>
               <p>${description}</p>
      `
    }).join('')

    descriptionDOM.innerHTML = descriptions;
  } catch (error) {
    console.error('l\'erreur' , error);
    descriptionDOM.innerHTML ='<h3 class="empty-list">There was an error, please try later....</h3>'
  }
}



// const getDescription = async (id, table) => {
  
//   const descriptionDOM = document.getElementById('descriptionDOM');
//   console.log(id);
//   console.log(table);
//   try {
//     const response = await axios.post('/api/v1/comptes/getdescription', {
//       id: id,
//       table: table
//     });

//     const descriptions = response.data.description.map((descrip) => {
//       return `<p>${descrip.description}</p>`;
//     }).join('');

//     descriptionDOM.innerHTML = descriptions;
//   } catch (error) {
//     console.error('Error:', error);
//     descriptionDOM.innerHTML = '<h3 class="empty-list">There was an error, please try later....</h3>';
//   }
// };


const getSousComptesAndDisplayByComptes = async (id) => {
  const sousComptesDOM = document.getElementById('showSousComptes');
  const nameOfAllComptesDOM = document.getElementById("nameOfAllComptesDOM");
  const loaderDOMComptes = document.querySelector('.loaderComptes')
 console.log(id);

    // if (loaderDOMComptes.classList.contains('hidden')) {
    //   loaderDOMComptes.classList.remove('hidden')
    // }
     // loaderDOMComptes.style.display = 'block'; // Pour afficher l'élément

  try {
      const {
          data: { sous_comptes },
        } = await axios.get(`/api/v1/comptes/allsouscomptesbyid/${id}`)
        if (sous_comptes.length < 1 ) {
          sousComptesDOM.innerHTML ='<h3 class="empty-list">il n\'y a pas de sous_comptes sélectionné un autre comptes, merci !</h3>'
          // return
        }
        const allSousComptes = sous_comptes.map((sous_compte) => {
          const {
                  id, 
                  name, 
                  nbr
                } = sous_compte;

          return ` 
          <div class="row">
            <div id=${nbr} class="col-auto">
              <span class="avatar" style="background-image: url(./assets/images/accounting.png)"></span>
            </div>
            <div class="col">
           
            <div class="badge bg-primary"></div>
          
                <strong>${nbr} ||</strong> ${name}
              </div>
              <div class="wrapperComptes">
                <div id="${id}" name="sous_comptes" class="descriptionClass">Description</div>
                <button id="${id}" class="sous_comptes button-80" role="button">Voir plus</button>
              </div>
              
            </div>

            
          </div>`
        }).join('');

        // const firstClassComptesName = comptes[0].class_comptes_name;
       
        sousComptesDOM.innerHTML = allSousComptes;
        // nameOfAllComptesDOM.innerText = firstClassComptesName ;
       
  } catch (error) {
      console.error('l\'erreur' , error);
      sousComptesDOM.innerHTML ='<h3 class="empty-list">There was an error, please try later....</h3>'
   } 
}






const getComptesAndDisplayByClasse = async (id) => {
  const ComptesDOM = document.getElementById('showComptes');
  const nameOfAllComptesDOM = document.getElementById("nameOfAllComptesDOM");
  const loaderDOMComptes = document.querySelector('.loaderComptes')
 console.log(id);

    // if (loaderDOMComptes.classList.contains('hidden')) {
    //   loaderDOMComptes.classList.remove('hidden')
    // }
     // loaderDOMComptes.style.display = 'block'; // Pour afficher l'élément

  try {
      const {
          data: { comptes },
        } = await axios.get(`/api/v1/comptes/allcomptesbyid/${id}`)
        if (comptes.length < 1 ) {
          return
        }
        const allComptes = comptes.map((compte) => {
          const {cc_name, 
                  id, 
                  name, 
                  nbr
                } = compte;

          return ` 
          <div class="row">
            <div id=${nbr} class="col-auto">
              <span class="avatar" style="background-image: url(./assets/images/accounting.png)"></span>
            </div>
            <div class="col">
           
            <div class="badge bg-primary"></div>
          
                <strong>${nbr} ||</strong> ${name}
              </div>
              <div class="wrapperComptes">
                <div id="${id}" name="comptes" class="descriptionClass">Description</div>
                <button id="${id}" class="comptes button-80" role="button">Voir sous comptes</button>
              </div>
              
            </div>

            
          </div>`
        }).join('');

        const firstClassComptesName = comptes[0].cc_name;
       
        ComptesDOM.innerHTML = allComptes;
        nameOfAllComptesDOM.innerText = firstClassComptesName ;
       
  } catch (error) {
      console.error('l\'erreur' , error);
      comptesDOM.innerHTML ='<h3 class="empty-list">There was an error, please try later....</h3>'
   } 
}








const getClassesAndDisplayByTypesClasse = async (id, classesDomm) => {
    const classesDOM = document.getElementById(`${classesDomm}`)

    try {
        const {
            data: { classes },
          } = await axios.get(`/api/v1/comptes/allclassesbyid/${id}`)
          if (classes.length < 1 ) {
            return
          }
          const allClasses = classes
          .map((classe) => {
            const { nbr, name, id} = classe;
            return `<div class="col-6">
            <div  style="cursor: pointer!important;" class="row g-3 align-items-center" >
              <a class="col-auto">
                <span class="avatar" style="background-image: url(./assets/images/accounting_classes.png)">
                  <span class="badge bg-green"></span></span>
              </a>
              <div class="col text-truncate">
                <a  class="text-reset d-block text-truncate">${name}</a>
                <div class="wrapperComptes">
                  <div class="text-muted text-truncate mt-n1 classes-name">${nbr}</div> 
                  <button id="${id}" class="classes_comptes button-80" role="button">Voir comptes</button>
                </div>
                <div id="${id}" name="classes_comptes" class="descriptionClass">Description</div>
              </div>
            </div>
          </div>`

          }).join('')
          classesDOM.innerHTML = allClasses
    } catch (error) {
        console.error('l\'erreur' , error);
        classesDOM.innerHTML ='<h5 class="empty-list">There was an error, please try later....</h5>'

    }
}





//---------------------------To Display all Classes of One TypesClasse---------------------------------

const btnNonLucratif = document.getElementById("btnNonLucratif");
const btnLucratif = document.getElementById("btnLucratif");
const lucratifElement = document.getElementById("lucratif");
const nonLucratifElement = document.getElementById("nonLucratif");
const classLucratif = document.getElementById("classLucratif");
const classeNonLucratif = document.getElementById("classNonLucratif");
const classDomLucratif = document.getElementById('classesDomLucratif');
const classDomNonLucratif = document.getElementById('classesDomNonLucratif');

let choiceBtn = [btnLucratif, btnNonLucratif];
let choiceElement = [lucratifElement, nonLucratifElement];
let choiceClasse = [classLucratif, classeNonLucratif];
let choiceClassesDom = ['classesDomLucratif', 'classesDomNonLucratif']
let index = [1, 2];


for (let i = 0; i < index.length; i++ ) {
    getClassesAndDisplayByTypesClasse(index[i], choiceClassesDom[i]);
   
}



for (let i = 0; i < choiceBtn.length; i++) {
    choiceBtn[i].addEventListener("click", () => {
        console.log(choiceClassesDom[i])
        // Ajoutez la classe "visible" à l'élément correspondant
        choiceElement[i].classList.add("visible");
        choiceClasse[i].classList.add("visible");
        
        // Supprimez la classe "visible" de l'autre élément
        for (let j = 0; j < choiceElement.length; j++) {
            if (j !== i) {
                choiceElement[j].classList.remove("visible");
                choiceClasse[j].classList.remove("visible");
            }
        }
    });
}




  document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('click', async (e) => {
          if (e.target.classList.contains('classes_comptes')) {
              e.preventDefault();
              const compteClickedId = e.target.id;
              await getComptesAndDisplayByClasse(compteClickedId);
              const boxClasseShowing = document.getElementById('BoxClasseShowing');
              boxClasseShowing.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('comptes')) {
            e.preventDefault();
            const compteClickedId = e.target.id;
            await getSousComptesAndDisplayByComptes(compteClickedId);
            const boxSousComptesShowing = document.getElementById('BoxSousComptesShowing');
            boxSousComptesShowing.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('descriptionClass')) {
          e.preventDefault();
          const descriptionBtnClickedId = e.target.id;
          const descriptionBtnClickedName = e.target.getAttribute('name');
          await getDescription(descriptionBtnClickedId, descriptionBtnClickedName);
          const BoxDescriptionShowing = document.getElementById('BoxDescriptionShowing');
          BoxDescriptionShowing.scrollIntoView({ behavior: 'smooth' });
      }
  });
});




