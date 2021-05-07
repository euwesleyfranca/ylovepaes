import Cropper from "cropperjs";
import firebase from "./firebase-app";

document.querySelectorAll('#user-profile').forEach(profile => {

    let cropper = null;


    const btnElement = profile.querySelector('#photo-select');
    const inputFileElement = profile.querySelector('input[type=file]');
    const profilePreview = profile.querySelector('#profile-preview');
    const menu = profilePreview.closest('#menu');
    const save = profile.querySelector('#save');



    save.addEventListener('click', e => {
        e.preventDefault();
        menu.classList.remove('cropping');
        save.disabled = true;
        save.innerHTML = 'salvando...'
        profilePreview.src = cropper.getCroppedCanvas().toDataURL("image/png");

        cropper.getCroppedCanvas().toBlob(blob => {

            const storage = firebase.storage();

            const imageReference = storage.ref().child("photos/user.png")
            let user = firebase.auth().currentUser;
            imageReference
                .put(blob)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(photoURL => user.updateProfile({ photoURL }))
                .then(() => {
                    console.log('foto atualizada');
                })
            cropper.destroy();
        });


    })

    profilePreview.addEventListener('click', e => {
        inputFileElement.click();
    })

    btnElement.addEventListener('click', e => {
        inputFileElement.click();
    })

    inputFileElement.addEventListener('change', e => {

        if (e.target.files.length) {
            const file = e.target.files[0];

            const reader = new FileReader();

            reader.onload = () => {

                profilePreview.src = reader.result;

                menu.classList.add('cropping');

                cropper = new Cropper(profilePreview, {
                    aspectRatio: 1 / 1,

                })
            }

            reader.readAsDataURL(file)

            e.target.value = "";
        }


    })


})