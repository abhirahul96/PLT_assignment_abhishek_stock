import express from 'express';
import routes from './routes';
import path from 'path';
export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    // Set EJS as the view engine
    this.app.set('view engine', 'ejs');
    // Set the views folder to your custom folder
    this.app.set('views', path.join(__dirname, 'templates'));
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use('/api/v1', routes);
    // Define a route to render the HTML file
    this.app.get('/', (req, res) => {
      res.render('index');
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
const app = new App();
app.start(3000);
