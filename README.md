# igotthingstodo

igotthingstodo is a fast 🔥 and sleek 😎 todo list ✅ https://igotthingstodo.vercel.app/

## Tech used

This is my first project using any of the tech below ⬇️

**Frontend - Sveltekit**. Sveltekit renders blazingly fast 🏎️ thanks to its server side rendering and no 👏 virtual 👏 dom 👏. 

**Backend - Firebase**. Firebase handles our...
 - user authentication - set up with google & apple signin
 - cloud functions - when a user signs up, we also add them to our DB
 - database - add todo items as documents under the userid/todos
 - security rules - only the correct user can read their todo items
 - emulating - in development, run local emulators for all used services so i can test changes before pushign


We also take an aggressive lazy loading stance and don't load _any_ firebase code in the initial load. 

This helps keep our lighthouse scores up ⭐⭐⭐

<img width="416" alt="image" src="https://user-images.githubusercontent.com/10564713/215191071-13c6edb6-5c9d-4541-93e9-f23b73c08262.png">

**Dev environment - Docker**. We are using docker just for the dev environment in this project. It fixes the "won't run on my machine" problem. One command ```docker-compose up --build``` will download npm packages, install firebase CLI, start the dev server, start firebase emulators, and more.  


**CI/CD - Github actions**. Automatically deploy to firebase on every push. 

**Hosting - Vercel**. This was the easiest hosting I've ever set up - 3 clicks! And it auto-detects new changes in the repo to redeploy 🤯

**Styling- Tailwind**. It was a 1 day learning curve but now I can't go back to regular CSS 😍


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)
