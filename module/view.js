export function View() {

   this.app = document.getElementById('app');

   // Функция для создания элемента
   this.createElement = function (elementName, className) {
      const element = document.createElement(elementName);
      if (className) {
         element.classList.add(className)
      }
      return element;
   }

   // Заголовок
   this.title = this.createElement('h1', 'title');
   this.title.textContent = 'Поиск репозиториев GitHub';

   // Основной блок
   this.mainContent = this.createElement('div', 'main');

   // Список репозиториев
   this.repositoriesListWrapper = this.createElement('div', 'repositories-wrapper');
   this.repositoriesList = this.createElement('ul', 'repositories');
   this.repositoriesListWrapper.append(this.repositoriesList);

   // Поле поиска
   this.form = this.createElement('form', 'search-form');
   this.searchLine = this.createElement('div', 'search-line');

   this.searchInput = this.createElement('input', 'search-input');
   this.searchBtn = this.createElement('button', 'btn');
   this.searchBtn.setAttribute("type", "submit");
   this.searchBtn.textContent = 'Найти';

   this.searchMessage = this.createElement('span', 'message');

   this.form.append(this.searchInput);
   this.form.append(this.searchBtn);

   this.searchLine.append(this.form);
   this.searchLine.append(this.searchMessage);


   //Добавление всех блоков в приложение
   this.app.append(this.title);
   this.app.append(this.searchLine);
   this.mainContent.append(this.repositoriesListWrapper);
   this.app.append(this.mainContent);


   this.setSearchMessage = function (message) {
      this.searchMessage.textContent = message;
   }

   this.clearSearchMessage = function () {
      this.searchMessage.textContent = "";
   }


   this.createRepo = function (repoData) {
      const repo = this.createElement('li', 'repo');
      repo.innerHTML = `<div class="repo__card">
                           <a href="${repoData.html_url}" target='_blank' class="repo__name">${repoData.full_name}</a>
                           <div class="repo__description"><p>${repoData.description || ""}</p></div>
                           <span class="repo__stars">${repoData.stargazers_count}</span>
                           <span class="repo__language">${repoData.language ? "Язык: " + repoData.language : ""}</span>
                        </div>`;
      this.repositoriesList.append(repo);
   }


   // Очистка найденных репозиториев
   this.clearRepositories = function () {
      this.repositoriesList.innerHTML = '';
   }
}
