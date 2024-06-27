export default class HomeController {
    getHome(req, res) {
        res.render('hero', {
            userEmail: req.session.userEmail,
            lastVisit: req.cookies.lastVisit,
        });
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }
}
