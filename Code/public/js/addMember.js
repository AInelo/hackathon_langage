const membersDOM = document.querySelector('#member')
// const loadingDOM = document.querySelector('.loading-text')
// const formDOM = document.querySelector('.task-form')
// const taskInputDOM = document.querySelector('.task-input')
// const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks

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
        const { _id: memberID, name, lastname, url } = member
        return `<div href="member.html?id=${memberID}" class="text-center text-gray-500 dark:text-gray-400">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="${url}" alt="Bonnie Avatar">
        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="">${name} ${lastname}</a>
        </h3>
        <p>Fidèle</p>
            <ul class="flex justify-center mt-4 space-x-4">
                <li>
                    <a href="#" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" id="mainIconPathAttribute" fill="green"></path> </svg>
                    </a>
                </li>
                
            </ul>
        </div>`
      })
      .join('')
      console.log(allMembers)
    membersDOM.innerHTML = allMembers
  } catch (error) {
    membersDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
      console.log(allMembers)
  }
//   loadingDOM.style.visibility = 'hidden'
}

showMembers()

// delete task /api/tasks/:id

// tasksDOM.addEventListener('click', async (e) => {
//   const el = e.target
//   if (el.parentElement.classList.contains('delete-btn')) {
//     // loadingDOM.style.visibility = 'visible'
//     const id = el.parentElement.dataset.id
//     try {
//       await axios.delete(`/api/v1/tasks/${id}`)
//       showTasks()
//     } catch (error) {
//       console.log(error)
//     }
//   }
// //   loadingDOM.style.visibility = 'hidden'
// })



// form
// To create a TASK
// formDOM.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   const name = taskInputDOM.value

//   try {
//     await axios.post('/api/v1/tasks', { name })
//     showTasks()
//     taskInputDOM.value = ''
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = `success, task added`
//     formAlertDOM.classList.add('text-success')
//   } catch (error) {
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.innerHTML = `error, please try again`
//   }
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//     formAlertDOM.classList.remove('text-success')
//   }, 3000)
// })