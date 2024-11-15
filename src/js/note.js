import { MAX_TITLE_LENGTH } from "./const.js";

const noteTitleInput = document.querySelector('.input__note-title');
const noteTextInput = document.querySelector('.input__note-text');
const noteFileInput = document.querySelector('.add__file-input');
const fileLinkContainer = document.querySelector('.file__link');
const fileOpenLink = document.querySelector('.file__open-link');
const fileDeleteButton = document.querySelector('.file__delete-button');
const saveNoteButton = document.querySelector('.save');


//Ограничение количества символов в заголовке
if (noteTitleInput) {
   noteTitleInput.addEventListener('input', () => {
      if (noteTitleInput.value.length > MAX_TITLE_LENGTH) {
         noteTitleInput.value = noteTitleInput.value.slice(0, MAX_TITLE_LENGTH);
      }
   });
}

//Загрузка файла в заметку и возможность его открыть и просмотреть
noteFileInput.addEventListener('change', () => {
   const file = noteFileInput.files[0];

   const displayFileName = file.name.length > 15 ? file.name.slice(0, 12) + '...' : file.name;

   if (file) {
      const fileURL = URL.createObjectURL(file);
      
      fileOpenLink.href = fileURL;
      fileOpenLink.textContent = `${displayFileName}`;
      fileLinkContainer.classList.remove('hidden');
   }
});

fileDeleteButton.addEventListener('click', () => {
   noteFileInput.value = '';

   fileOpenLink.href = '#';
   fileOpenLink.textContent = '';
   fileLinkContainer.classList.add('hidden');
});

//Если заголовок и текст заметки пусты, кнопка сохранить недоступна
if (noteTitleInput && noteTextInput) {
   noteTitleInput.addEventListener('input', (toggleSaveButton));
   noteTextInput.addEventListener('input', toggleSaveButton);
}

function toggleSaveButton() {
    if (noteTitleInput.value.length > 0 && noteTextInput.value.length > 0) {
        saveNoteButton.classList.remove('isDisabled');
    } else {
        saveNoteButton.classList.add('isDisabled');
    }
}

