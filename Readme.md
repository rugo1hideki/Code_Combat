Begin

If you want to deploy an application to your device, download this repository and enter the command `npm install` into the console.

Create a .env file and enter PORT=3000 and MONGO_URL = "your Mongo database" with these parameters

- Mat = image
- Pos = character
- Id = character destination

After entering `npm run dev` into the console and following the link to `[http://localhost:3000/]:http://localhost:3000/`
[example site]
[example site]:http://example.com

---

This project was inspired by `[codecombat.com]:https://codecombat.com/`

In it, you have to bring the character to the cheese.
To do this you need to use the character control commands:

For the character to start moving, you must enter `invoker.SetCommand(receiver.following)`.

For example, the character will move to the right: `invoker.SetCommand(receiver.right)`.

After that you can choose left, up and down.
