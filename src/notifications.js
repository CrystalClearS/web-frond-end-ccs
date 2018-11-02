import IziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';
window.showModal = function(title, text, type) {
    IziToast.show({
        title: title,
        message: text,
        zindex: 100,
        position: 'topRight',
    });
};

window.showError = function(title, text) {
    IziToast.error({
        title: title,
        message: text,
        zindex: 100,
        position: 'topRight',
    });
};

window.showWarning = function(title, text) {
    IziToast.warning({
        title: title,
        message: text,
        zindex: 100,
        position: 'topRight',
    });
};

window.showSuccess = function(title, text) {
    IziToast.success({
        title: title,
        message: text,
        zindex: 100,
        position: 'topRight',
    });
};
