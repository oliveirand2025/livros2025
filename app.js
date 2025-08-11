// Firebase config (substitui com os teus dados do Firebase)
const firebaseConfig = {
  apiKey: "TUA_API_KEY",
  authDomain: "teu-projeto.firebaseapp.com",
  projectId: "teu-projeto",
  storageBucket: "teu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const file = form.cover.files[0];

  const storageRef = storage.ref(`covers/${file.name}`);
  await storageRef.put(file);
  const coverURL = await storageRef.getDownloadURL();

  const bookData = {
    title: form.title.value,
    author: form.author.value,
    year: parseInt(form.year.value),
    genre: form.genre.value,
    pages: parseInt(form.pages.value),
    rating: parseInt(form.rating.value),
    cover: coverURL
  };

  await db.collection("books").add(bookData);
  alert("Livro adicionado com sucesso!");
  form.reset();
});
