'use strict';

module.exports = {

  loadRoutes: function(app, utils, controllers, passport) {

    var isAuthenticated = utils.passport.isAuthenticated;
    var isAuthorized = utils.passport.isAuthorized;

    app.get('/', function(req, res) {
      if(req.user &&  req.user.mata.isVerified && !req.user.mata.isAdmin) {
        res.redirect('/home');
      }
      else if (req.user &&  req.user.mata.isAdmin) {
        res.redirect('/adminHome');
      }
      else { res.render('index'); }
    });
    // =========================================================================
    // Auth Routes -------------------------------------------------------------
    // -------------------------------------------------------------------------
    app.get('/login', controllers.user.getLogin);
    app.post('/login', controllers.user.postLogin);

    app.get('/adminLogin', controllers.admin.getLogin);
    app.post('/adminLogin', controllers.admin.postLogin);
    app.get('/adminHome',isAuthenticated, controllers.admin.adminHome);
    app.get('/scheduler', isAuthenticated,controllers.admin.scheduler);
    app.get('/scrapNow',isAuthenticated,controllers.admin.scrapNow);
    app.get('/scrapperLog',isAuthenticated, controllers.admin.scrapperLog);
    app.get('/scrapperLogByDate',isAuthenticated, controllers.admin.scrapperLogByDate);

    app.get('/logout', controllers.user.getLogout);

    app.get('/register', controllers.user.getRegister);
    app.post('/register', controllers.user.postRegister);

    app.get('/forgot', controllers.user.getForgot);
    app.post('/forgot', controllers.user.postForgot);

    app.get('/reset/:token', controllers.user.getReset);
    app.post('/reset/:token', controllers.user.postReset);

    app.get('/verify_account/:token', controllers.user.getVerifyAccount);

    // =========================================================================

    // =========================================================================
    // User Routes -------------------------------------------------------------
    // -------------------------------------------------------------------------
    app.get('/home', isAuthenticated, controllers.user.getHome);
    app.get('/aboutus', controllers.user.aboutUs);
    app.get('/subscription', controllers.user.subscription);
    app.get('/contactus', controllers.user.contactUs);
    app.get('/privacy&security', controllers.user.privacy);
    app.get('/faq', controllers.user.faq);
    app.get('/delete/:id', isAuthenticated, controllers.user.deleteCase);
    
    // =========================================================================

    // ========================================================================= 
    // Add Matters =============================================================
    //--------------------------------------------------------------------------
    app.post('/addMatter', isAuthenticated,controllers.addMatter.postAddMatter);
    app.get('/test', isAuthenticated, function(req, res) {res.render('test')});
    app.get('/test1', isAuthenticated, function(req, res) {res.render('form')});
    app.get('/addMatterEnquire/:key', isAuthenticated,controllers.addMatter.getEnquireMatter);
    app.post('/submitMatter', isAuthenticated, controllers.addMatter.postSubmitMatter);
    app.post('/submitMeeting', isAuthenticated, controllers.addMatter.postAddMeeting);
    app.post('/addComment', isAuthenticated, controllers.addMatter.postAddComment);
    app.post('/addDocument', isAuthenticated, controllers.addMatter.postAddDocument);
    app.post('/update', isAuthenticated, controllers.addMatter.update);

    // ========================================================================= 
    // Get Details for client =============================================================
    //--------------------------------------------------------------------------

    app.get('/personalCauseList', isAuthenticated, controllers.caseDetail.getPersonalCauseList); 
    app.post('/filterCases', isAuthenticated, controllers.caseDetail.getFilterCases);
    app.get('/caseDetail/:id', isAuthenticated, controllers.caseDetail.getCaseDetail);
    app.get('/editHearingDate/:id', isAuthenticated, controllers.caseDetail.getEditHearingDate);

  }

};