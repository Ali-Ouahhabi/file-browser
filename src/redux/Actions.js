//TODO action move file and folder

const Actions = {
    ACTION: {
        SIGN_IN: "SIGN_IN",
        LOG_OUT: "LOG_OUT",
        REGISTER: "REGISTER",
        USER: "USER",

        CREATE: "CREATE",
        RENAME: "RENAME",
        DELETE: "DELETE",
        DOWNLOAD: "DOWNLOAD",
        UPLOAD: "UPLOAD",

        LOCAL: "LOCAL",
        REMOTE: "REMOTE",

        FILE: "FILE",
        FOLDER: "FOLDER",

        LOADING: "LOADING",
        SUCCESS: "SUCCESS",
        ERROR: "ERROR",

    },
    UserManager: {
        USER: {
            SIGN_IN: {
                REMOTE: ["USER", "SIGN_IN", "REMOTE"],
                LOCAL: {
                    LOADING: ["USER", "SIGN_IN", "LOCAL", "LOADING"],
                    SUCCESS: ["USER", "SIGN_IN", "LOCAL", "SUCCESS"],
                    ERROR: ["USER", "SIGN_IN", "LOCAL", "ERROR"]
                }
            },

            LOG_OUT: {
                REMOTE: ["USER", "LOG_OUT", "REMOTE"],
                LOCAL: {
                    LOADING: ["USER", "LOG_OUT", "LOCAL", "LOADING"],
                    SUCCESS: ["USER", "LOG_OUT", "LOCAL", "SUCCESS"],
                    ERROR: ["USER", "LOG_OUT", "LOCAL", "ERROR"]
                }
            },


            REGISTER: {
                REMOTE: ["USER", "REGISTER", "REMOTE"],
                LOCAL: {
                    LOADING: ["USER", "REGISTER", "LOCAL", "LOADING"],
                    SUCCESS: ["USER", "REGISTER", "LOCAL", "SUCCESS"],
                    ERROR: ["USER", "REGISTER", "LOCAL", "ERROR"]
                }
            }
        }
    },

    FileManager: {

        FILE: {
            CREATE: {
                REMOTE: ["FILE", "CREATE", "REMOTE"],
                LOCAL: {
                    LOADING: ["FILE", "CREATE", "LOCAL", "LOADING"],
                    SUCCESS: ["FILE", "CREATE", "LOCAL", "SUCCESS"],
                    ERROR: ["FILE", "CREATE", "LOCAL", "ERROR"]
                }
            },
            RENAME: {
                REMOTE: ["FILE", "RENAME", "REMOTE"],
                LOCAL: {
                    LOADING: ["FILE", "RENAME", "LOCAL", "LOADING"],
                    SUCCESS: ["FILE", "RENAME", "LOCAL", "SUCCESS"],
                    ERROR: ["FILE", "RENAME", "LOCAL", "ERROR"]
                }
            },
            DELETE: {
                REMOTE: ["FILE", "DELETE", "REMOTE"],
                LOCAL: {
                    LOADING: ["FILE", "DELETE", "LOCAL", "LOADING"],
                    SUCCESS: ["FILE", "DELETE", "LOCAL", "SUCCESS"],
                    ERROR: ["FILE", "DELETE", "LOCAL", "ERROR"]
                }
            },
            DOWNLOAD: {
                REMOTE: ["FILE", "DOWNLOAD", "REMOTE"],
                LOCAL: {
                    LOADING: ["FILE", "DOWNLOAD", "LOCAL", "LOADING"],
                    SUCCESS: ["FILE", "DOWNLOAD", "LOCAL", "SUCCESS"],
                    ERROR: ["FILE", "DOWNLOAD", "LOCAL", "ERROR"]
                }
            },
            UPLOAD: {
                REMOTE: ["FILE", "UPLOAD", "REMOTE"],
                LOCAL: {
                    LOADING: ["FILE", "UPLOAD", "LOCAL", "LOADING"],
                    SUCCESS: ["FILE", "UPLOAD", "LOCAL", "SUCCESS"],
                    ERROR: ["FILE", "UPLOAD", "LOCAL", "ERROR"]
                }
            },
        },
        FOLDER: {
            CREATE: {
                REMOTE: ["FOLDER", "CREATE", "REMOTE"],
                LOCAL: {
                    LOADING: ["FOLDER", "CREATE", "LOCAL", "LOADING"],
                    SUCCESS: ["FOLDER", "CREATE", "LOCAL", "SUCCESS"],
                    ERROR: ["FOLDER", "CREATE", "LOCAL", "ERROR"]
                }
            },
            RENAME: {
                REMOTE: ["FOLDER", "RENAME", "REMOTE"],
                LOCAL: {
                    LOADING: ["FOLDER", "RENAME", "LOCAL", "LOADING"],
                    SUCCESS: ["FOLDER", "RENAME", "LOCAL", "SUCCESS"],
                    ERROR: ["FOLDER", "RENAME", "LOCAL", "ERROR"]
                }
            },
            DELETE: {
                REMOTE: ["FOLDER", "DELETE", "REMOTE"],
                LOCAL: {
                    LOADING: ["FOLDER", "DELETE", "LOCAL", "LOADING"],
                    SUCCESS: ["FOLDER", "DELETE", "LOCAL", "SUCCESS"],
                    ERROR: ["FOLDER", "DELETE", "LOCAL", "ERROR"]
                }
            },
            DOWNLOAD: {
                REMOTE: ["FOLDER", "DOWNLOAD", "REMOTE"],
                LOCAL: {
                    LOADING: ["FOLDER", "DOWNLOAD", "LOCAL", "LOADING"],
                    SUCCESS: ["FOLDER", "DOWNLOAD", "LOCAL", "SUCCESS"],
                    ERROR: ["FOLDER", "DOWNLOAD", "LOCAL", "ERROR"]
                }
            },
            UPLOAD: {
                REMOTE: ["FOLDER", "UPLOAD", "REMOTE"],
                LOCAL: {
                    LOADING: ["FOLDER", "UPLOAD", "LOCAL", "LOADING"],
                    SUCCESS: ["FOLDER", "UPLOAD", "LOCAL", "SUCCESS"],
                    ERROR: ["FOLDER", "UPLOAD", "LOCAL", "ERROR"]
                }
            }
        }
    }
}

function setAction(actionType, payload) {
    return payload ? { type: actionType, payload } : { type: actionType, payload: "" }
};

export { Actions, setAction };
