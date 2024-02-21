export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
        this.handleCSS(route);
      });
  }

  handleCSS(route) {
    switch (route) {
      case "/pages/home.html":
        document.getElementById("app").classList = "home";
        break;
      case "/pages/universe.html":
        document.getElementById("app").classList = "universe";
        break;
      case "/pages/exploration.html":
        document.getElementById("app").classList = "exploration";
        break;
      default:
        document.getElementById("app").classList = "error-404";
        break;
    }
  }
}
