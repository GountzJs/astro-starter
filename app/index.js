var Generator = require("yeoman-generator");

module.exports = class extends Generator {
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

    this.fs.copy(
      this.templatePath("./astro/**"),
      this.destinationPath(this.answers.appName),
      {
        globOptions: { dot: true },
      }
    );

    this.fs.copyTpl(
      this.templatePath("./astro/package.json"),
      this.destinationPath(`${this.answers.appName}/package.json`),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath("./astro/README.md"),
      this.destinationPath(`${this.answers.appName}/README.md`),
      this.answers
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
