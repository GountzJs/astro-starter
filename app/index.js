var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "appName",
        message: "Your project name",
        default: "my-astro-project",
        validate: (input) => {
          if (input.length <= 3) {
            return "Project name must be at least 3 characters long";
          }
          return true;
        },
      },
    ]);

    this.log("app name", this.answers.appName);
  }

  writing() {
    this.log("🤖 Starting to generate the project...");
    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(this.answers.appName),
      {
        appName: this.answers.appName,
      }
    );
    this.log("🤖 Project generated");
  }

  end() {
    this.log("🤖 Finalizing the project generation...");
    const filePath = this.destinationPath(".yo-rc.json");
    if (this.fs.exists(filePath)) {
      this.fs.delete(filePath);
      this.log("🤖 .yo-rc.json deleted");
    }
    this.log("🤖 Project generation finalized");
  }
};
