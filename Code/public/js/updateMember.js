// To Display the form for adding an other member
const membersDOM = document.querySelector('#member')
// const loadingDOM = document.querySelector('.loading-text')

// Load member from /api/v1/member
const showMembers = async () => {
//   loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { members },
    } = await axios.get('/api/v1/member')
    if (members.length < 1) {
      membersDOM.innerHTML = '<h5 class="empty-list">No members in your list</h5>'
    //   loadingDOM.style.visibility = 'hidden'
      return
    }
    const allMembers = members
      .map((member) => {
        const { 
          _id: memberID, 
          name, 
          lastname,
          filename,
          filepath 
        } = member
        return `<div href="member.html?id=${memberID}" class="text-center text-gray-500 dark:text-gray-400">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="${filepath}" alt="${filename}">
        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <div class="">
          <input type="text" name="email" id="email" class="py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" placeholder="${name}" required>
          <input type="text" name="email" id="email" class="py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" placeholder="${lastname}" required>
        </div>

        <button id="updateTrigger" class="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Modifier</button>

        <!--  <p>Fidèle</p>  -->
            <ul class="flex justify-center mt-4 space-x-4">
                <li>
                <!-- <a href="" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white"> -->
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" id="IconChangeColor"> 
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" id="mainIconPathAttribute" fill="green"></path> 
                        </svg>
                        <svg id="delete-btn-${memberID}" class="svg-icon w-7 h-7 cursor-pointer" viewBox="0 0 20 20">
							            <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" fill="red"></path>
						            </svg>
                <!-- </a> -->
                </li>
                
            </ul>
        </div>`
      })
      .join('')
    //  console.log(allMembers)
    membersDOM.innerHTML = allMembers
  } catch (error) {
    membersDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
    //  console.log(allMembers);
  }
//   loadingDOM.style.visibility = 'hidden'
}

showMembers()



// Supprimer le membre depuis /api/v1/member/:id
membersDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.id.startsWith('delete-btn-')) {
    const id = el.id.replace('delete-btn-', '')
    try {
      await axios.delete(`/api/v1/member/${id}`)
      showMembers()
    } catch (error) {
      console.log(error)
    }
  }
})



// For Create a new member

// const addMemberForm = document.getElementById('addMember');
// const imageInput = document.getElementById('image');
// const addMemberName = document.getElementById('addMemberName');
// const addMemberLastname = document.getElementById('addMemberLastname');
// const addMemberNumber = document.getElementById('addMemberNumber');

// addMemberForm.addEventListener('submit', async (e) => {
//   //e.preventDefault(); // Empêcher le comportement par défaut du formulaire
//   console.log('Voici le', addMemberLastname)
//   try {
//     // Créer un objet FormData pour inclure le fichier et les données du formulaire
//     const formData = new FormData();
//     formData.append('name', addMemberName.value);
//     formData.append('lastname', addMemberLastname.value);
//     formData.append('number', addMemberNumber.value);
//     formData.append('image', imageInput.files[0]); // Remplacez 'imageInput' par votre référence réelle à l'élément d'entrée de fichier

//     // Envoyer la requête POST avec Axios
//     const response = await axios.post('/api/v1/member', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Assurez-vous d'ajuster le type de contenu en fonction de ce que votre serveur attend
//       },
//     });

//     console.log('Réponse du serveur:', response.data);
//     // Gérer la réponse du serveur ici (par exemple, afficher un message de réussite)

//   } catch (error) {
//     console.error('Erreur lors de la requête POST:', error);
//     // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
//   }
// });










const addMemberForm = document.getElementById('addMember');
const imageInput = document.getElementById('image');
const addMemberName = document.getElementById('addMemberName');
const addMemberLastname = document.getElementById('addMemberLastname');
const addMemberNumber = document.getElementById('addMemberNumber');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');



const selectImage = document.querySelector('#image');
const inputFile = document.querySelector('#image');
const imgArea = document.querySelector('.img-area');



// const selectImage = document.querySelector('.select-image');
// const inputFile = document.querySelector('#file');
// const imgArea = document.querySelector('.img-area');


selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})




// imageInput.addEventListener('change', async (event) => {
//   const file = event.target.files[0];

//   if (file) {
//     const formData = new FormData();
//     formData.append('name', addMemberName.value);
//     formData.append('lastname', addMemberLastname.value);
//     formData.append('number', addMemberNumber.value);
//     formData.append('image', file);

//     // Afficher la barre de progression avant le téléchargement
//     progressBarContainer.classList.remove('hidden');

//     try {
//       // Utiliser Axios pour envoyer la requête POST avec la configuration onUploadProgress
//       await axios.post('/api/v1/member', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.lengthComputable) {
//             const percentage = (progressEvent.loaded / progressEvent.total) * 100;
//             progressBar.style.width = `${percentage}%`;
//           }
//         },
//       });

//       // Réinitialiser la barre de progression après le téléchargement
//       progressBar.style.width = '0%';
//     } catch (error) {
//       console.error('Erreur lors de la requête POST:', error);
//     }

//     // Réinitialiser la valeur de l'input pour permettre de sélectionner à nouveau le même fichier
//     imageInput.value = '';
//   }
// });

// Vous pouvez également conserver votre gestionnaire d'événements submit ici

addMemberForm.addEventListener('submit', async (e) => {
  //e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  console.log('Voici le', addMemberLastname)
  try {
    // Créer un objet FormData pour inclure le fichier et les données du formulaire
    const formData = new FormData();
    formData.append('name', addMemberName.value);
    formData.append('lastname', addMemberLastname.value);
    formData.append('number', addMemberNumber.value);
    formData.append('image', imageInput.files[0]); // Remplacez 'imageInput' par votre référence réelle à l'élément d'entrée de fichier

    // Envoyer la requête POST avec Axios
    const response = await axios.post('/api/v1/member', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Assurez-vous d'ajuster le type de contenu en fonction de ce que votre serveur attend
      },
    });

    console.log('Réponse du serveur:', response.data);
    // Gérer la réponse du serveur ici (par exemple, afficher un message de réussite)

  } catch (error) {
    console.error('Erreur lors de la requête POST:', error);
    // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
  }
});







// Update member information from /api/v1/member/:id
// membersDOM.addEventListener('click', async (e) => {
//   const el = e.target
//   if (el.id.startsWith('delete-btn-')) {
//     const id = el.id.replace('delete-btn-', '')
//     try {
//       await axios.delete(`/api/v1/member/${id}`)
//       showMembers()
//     } catch (error) {
//       console.log(error)
//     }
//   }
// })
