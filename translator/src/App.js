import "./App.css";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Validate from "./validate.js";
import CREDENTIALS from "./credentials.json";
const { Translate } = require("@google-cloud/translate").v2;

async function translateText(translate, text, target, state) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  state.text.output = translations[0];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: {
        value: "",
        error: "",
        output: "",
      },
    };
  }
  changeState() {
    const translate = new Translate({ credentials: CREDENTIALS });
    const text = this.state.text.value;
    const target = "es";
    let state = this.state;
    state.text.error = Validate(this.state.text.value);
    translateText(translate, text, target, state);
    console.log(state)
    // this.setState(state);
  }
  
  submitForm(event) {
    event.preventDefault();
    let state = this.state;
    this.setState(state);
  }
  updateForm(event) {
    this.setState({
      text: {
        value: event.target.value,
        error: this.state.text.error,
      },
    });
  }
  componentWillUpdate(){   
     this.changeState();
  }
  render() {
    return (
      <div className="App">
        <Grid container>
          <Grid item xs={12} align="center">
            <Typography variant="h2">Translator</Typography>
          </Grid>
          <Grid item xs={12}>
            <form
              onSubmit={(event) => {
                this.submitForm(event);
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter text here"
                variant="outlined"
                value={this.state.text.value}
                helperText={this.state.text.error}
                error={this.state.text.error !== ""}
                onChange={(event) => {
                  this.updateForm(event);
                }}
              />
              <Button type="submit" variant="contained">
                Translate
              </Button>
            </form>
            <p>{this.state.text.output}</p>
            {/* <TextField 
      fullWidth
       variant="outlined" 
       value={this.state.text.output}
       helperText={this.state.text.error}
       error={this.state.text.error !==""} 
       /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
