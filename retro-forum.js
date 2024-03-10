const loadData = async (quarry = "") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${quarry}`);
    const data = await res.json();
    const posts = data.posts;
    displayData(posts);
}
const displayData = (posts) => {
    console.log(posts);
    const allPostContainer = document.getElementById('post-container')
    allPostContainer.innerHTML = '';

    posts.forEach(post => {

        const div = document.createElement('div');
        div.classList = 'card flex flex-col  bg-[#F3F3F5] shadow-xl p-10 mt-8 lg:flex-row'
        div.innerHTML = `
        
        <div class="indicator">
            <span id="active-status" class="indicator-item badge"></span>
            <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${post.image}" alt=""></div>
          </div>
         <div class="ml-12 space-y-5">
            <div class="flex gap-3 text-gray-400">
                <p>#${post.category}</p>
                <p>Author:${post.author.name}</p>
            </div>
          <h2 class="card-title">${post.title}</h2>
          
          <p class="text-gray-400">${post.description}</p>
          <hr class="border-dashed">
           <div class="card-actions items-center">
            <div class="flex gap-1"><img src="assets/svg/comment_icon.svg" alt=""><p>${post.comment_count}</p></div>
            <div class="flex gap-1"><img src="assets/svg/eye_icon.svg" alt=""><p>${post.view_count}</p></div>
            <div class="flex gap-1"><img src="assets/svg/timer icon.svg" alt=""><p>${post.posted_time}</p></div>
            <div class="ml-96"> <button onclick="handelMarkAsRead('${post.title}','${post.view_count}')"> <img src="assets/svg/read-icon.svg" alt=""></button></div>
           </div>
            
          </div>
          

        </div>
        `
        allPostContainer.appendChild(div);
        toggleLoadingSpinner(false);


        const activeStatusContainer = document.getElementById('active-status');
        
        if(post.isActive===true){
            activeStatusContainer.classList.add('bg-[#10B981]');
    
        }
        else{
            activeStatusContainer.classList.add('bg-[#FF3434]')
        }


    });
}
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const value = document.getElementById('search-field').value;
    loadData(`?category=${value}`);
    console.log(value);

}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

const isActive = () => {
    // const activeStatusContainer = document.getElementById('active-status');
    // const activeStatus = activeStatusContainer.value;
    // if(activeStatus===true){
    //     activeStatusContainer.classList.add('bg-[#10B981]');

    // }
    // else{
    //     activeStatusContainer.classList.add('bg-[#FF3434]')
    // }
}
const handelMarkAsRead = (title,view_count) => {
    const markAsReadContainer = document.getElementById('post-read-container');
    const div = document.createElement('div');
    div.classList = "bg-white rounded-xl p-6 mt-4 flex justify-between w-[332px]";
    div.innerHTML = `
                        <h1 class="text-xl font-semibold">${title}</h1>
                        <div class="flex items-center gap-1"><img src="assets/svg/eye_icon.svg" alt=""><p>${view_count}</p></div>
    `
    markAsReadContainer.appendChild(div);
}
const loadLatestPost = async() =>{
    const latestPost = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const datas =await latestPost.json();
    const latestPostContainer = document.getElementById('latest-post-container');
    console.log(datas)


    datas.forEach(data=>{
    const div = document.createElement('div');
    div.classList ='card w-96 bg-base-100 shadow-xl p-5';
    div.innerHTML = `
    <figure><img src="${data.cover_image}"  /></figure>
    <span class="flex gap-2"><img src="assets/svg/posted_date.svg" alt=""><p>${data.author.posted_date || 'No Published Date'}</p></span>
    <div class="card-body">
      <h2 class="card-title">${data.title}</h2>
      <p>${data.description}</p>
      <div class="card-actions">
        <img class="w-[44px] h-[44px] rounded-full" src="${data.profile_image}" alt="">
        <div>
            <h1>${data.author.name}</h1>
            <p>${data.author.designation}</p>
        </div>
      </div>
    </div>
  </div>
    `
    latestPostContainer.appendChild(div)

    } )

}



loadLatestPost();

loadData();

