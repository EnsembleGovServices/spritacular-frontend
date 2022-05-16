export const baseURL = {
    base: process.env.REACT_APP_BASE_URL,
    remote: process.env.REACT_APP_BASE_REMOTE,
    api: process.env.REACT_APP_API_URL,
    token: process.env.REACT_APP_API_TOKEN_URL,
    refresh: process.env.REACT_APP_API_REFRESH_URL,
    user: process.env.REACT_APP_API_USER_URL,
    register: process.env.REACT_APP_API_REGISTER_URL,
    create_blog: process.env.REACT_APP_API_CREATE_BLOG_URL,
    get_blog: process.env.REACT_APP_API_ALL_BLOG_URL,
    get_single_blog: process.env.REACT_APP_API_SINGLE_BLOG_URL,
    blog_image_upload: process.env.REACT_APP_API_BLOG_IMAGE_UPLOAD,
    blog_category: process.env.REACT_APP_API_BLOG_CATEGORY,
    blog_tut_update: process.env.REACT_APP_API_BLOG_TUT_UPDATE
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
    myObservations: 'observations',
    gallery: 'gallery',
    observationsAdd: 'observations/add',
    observationsUpdate: 'observations/update',
    dashboard: 'dashboard',
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
    }
}