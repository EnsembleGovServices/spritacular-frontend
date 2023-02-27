export const baseURL = {
    appName: process.env.REACT_APP_BASE_NAME,
    base: process.env.REACT_APP_BASE_URL,
    remote: process.env.REACT_APP_BASE_REMOTE,
    api: process.env.REACT_APP_API_URL,
    token: process.env.REACT_APP_API_TOKEN_URL,
    refresh: process.env.REACT_APP_API_REFRESH_URL,
    mapApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    user: process.env.REACT_APP_API_USER_URL,
    register: process.env.REACT_APP_API_REGISTER_URL,
    draftUrl: process.env.REACT_APP_OBSERVATION_DRAFT_DELETE,
    create_blog: process.env.REACT_APP_API_CREATE_BLOG_URL,
    get_blog: process.env.REACT_APP_API_ALL_BLOG_URL,
    get_single_blog: process.env.REACT_APP_API_SINGLE_BLOG_URL,
    blog_image_upload: process.env.REACT_APP_API_BLOG_IMAGE_UPLOAD,
    blog_category: process.env.REACT_APP_API_BLOG_CATEGORY,
    blog_tut_update: process.env.REACT_APP_API_BLOG_TUT_UPDATE,
    blog_tut_delete: process.env.REACT_APP_API_BLOG_TUT_DELETE,
    quiz_question: process.env.REACT_APP_API_QUIZ_QUESTION,
    quiz_submit: process.env.REACT_APP_API_SUBMIT_QUE_ANS,
    static_policy: process.env.REACT_APP_STATIC_API_POLICY,
    static_ambassador: process.env.REACT_APP_STATIC_API_AMBASSADOR,
    static_google_group: process.env.REACT_APP_STATIC_API_GOOGLE_GROUP,
    team_list: process.env.REACT_APP_TEAM_LIST_API,
    team_view: process.env.REACT_APP_TEAM_VIEW_API,
    team_add: process.env.REACT_APP_TEAM_ADD_API,
    team_update: process.env.REACT_APP_TEAM_UPDATE_API,
    team_delete: process.env.REACT_APP_TEAM_DELETE_API,
}

export const cameraSettingFields = {
    camera_type: '',
    focal_length: '',
    aperture: null,
    iso: '',
    shutter_speed: '',
    fps: '',
    question_field_one: '',
    question_field_two: ''
}


export const routeUrls = {
    home: '/',
    about: 'about',
    getStarted: 'get-started',
    policy: 'policy',
    login: 'login',
    profile: 'profile',
    tutorials: 'tutorials',
    tutorialsDetail: ':slug',
    blog: 'blog',
    blogDetails: ':slug',
    quiz: {
        home: 'quiz'
    },
    myObservations: 'observations',
    gallery: 'gallery',
    observationsAdd: 'observations/add',
    observationsUpdate: 'observations/update',
    dashboard: '/dashboard',
    dashBlog: {
        list: 'blog',
        create: 'create',
        view: ':slug',
        edit: ':slug/edit'
    },
    dashTutorial: {
        list: 'tutorial',
        create: 'create',
        view: ':slug',
        edit: ':slug/edit'
    },
    dashTeams: {
        list: 'team',
        create: 'create',
        view: ':id',
        edit: ':id/edit'
    },
    pages: {
        meetTheTeam: 'meet-the-team',
        getInvolved: 'get-involved',
        spritacularGoogleGroup: 'news-and-announcements'
    },

}


export const cdn = {
    url: process.env.REACT_APP_CDN_URL
}