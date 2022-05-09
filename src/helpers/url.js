export const baseURL = {
    base: process.env.REACT_APP_BASE_URL,
    remote: process.env.REACT_APP_BASE_REMOTE,
    api: process.env.REACT_APP_API_URL,
    token: process.env.REACT_APP_API_TOKEN_URL,
    refresh: process.env.REACT_APP_API_REFRESH_URL,
    user: process.env.REACT_APP_API_USER_URL,
    register: process.env.REACT_APP_API_REGISTER_URL,
    create_blog: process.env.REACT_APP_API_CREATE_BLOG_URL
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
    blog: 'blog',
    tutorials: 'tutorials',
    tutorialsDetail: 'tutorials-detail',
    policy: 'policy',
    login: 'login',
    profile: 'profile',
    myObservations: 'observations',
    gallery: 'gallery',
    observationsAdd: 'observations/add',
    observationsUpdate: 'observations/update',
    dashboard: 'dashboard',
    dashBlog: {
        list: 'blog',
        create: 'create',
        view: ':blogID'
    }
}