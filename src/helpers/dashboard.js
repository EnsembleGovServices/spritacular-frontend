export const dashboardHelper = {
    filterState: {
        isCountryOpen: false,
        isTypeOpen: false,
        isStatusOpen: false,
        isRateOpen: false,
        isFOVOpen: false,
        isLensTypeOpen: false,
    },
    horizontal: {
        country: {
            name: '',
            code: ''
        },
        type: '',
        status: '',
        filtered: false
    },
    vertical: {
        // from_obs_data: null,
        // to_obs_data: null,
        obs_start_date: null,
        obs_end_date: null,
        obs_start_time: null,
        obs_end_time: null,
        // camera_type: "",
        // fps: "",
        // iso: "",
        // fov: "",
        // shutter_speed: "",
        // lens_type: "",
        filtered: false
    },
    nextPageUrl: '/observation/dashboard/?country=&category=&status='
}