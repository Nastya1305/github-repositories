const REPO_PER_PAGE = 10;

export function Search(view) {
   this.view = view;

   this.searchRepositories = function () {
      this.view.clearSearchMessage();
      this.view.clearRepositories();

      let searchValue = this.view.searchInput.value;

      if (!searchValue) { return; }

      if (searchValue.length < 3) {
         this.view.setSearchMessage("Введенных символов недостаточно");
         return;
      }

      fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(searchValue)}&per_page=${REPO_PER_PAGE}&page=1`)
         .then(response => {
            if (response.status >= 200 && response.status < 300) {
               return response;
            } else {
               throw new Error(response.status);
            }
         })
         .then(res => this.updateRepositories(res))
         .catch(err => {
            if (err.message == 403) {
               this.view.setSearchMessage('Ошибка 403 - ' +
                  "Превышено допустимое количество запросов в минуту");
            } else
               throw err;
         });
   }


   this.updateRepositories = function (response) {
      let repositories;
      if (response.ok) {
         this.view.clearRepositories();
         response.json().then((res) => {
            if (res.items) {
               repositories = res.items;
               repositories.forEach(repo => this.view.createRepo(repo));
            } else {
               this.view.clearRepositories();
            }
            if (res.items.length == 0) {
               this.view.setSearchMessage('По вашему запросу ничего не найдено');
            }
         });
      } else {
         this.view.setSearchMessage('Ошибка ' + response.status);
      }
   }

   this.view.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.searchRepositories();
   });
}