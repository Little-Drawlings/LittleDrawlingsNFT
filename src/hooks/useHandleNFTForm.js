import React, {useContext, useState} from 'react';
import {Context} from "../store";
import useHandleNFT from "./useHandleNFT";

const useHandleNftForm = ({item, onRequestClose, callback}) => {
    const [{user}] = useContext(Context);

    const defaultFormData = {
        image: null,
        switcher: "0",
        provider: user?.provider,
        profileName: item?.profileName ?? "",
        aboutMe: item?.aboutMe ?? "",
        links: item?.links?.length > 0 ? item?.links : [
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
        ],
    }

    const [formData, setFormData] = useState(defaultFormData)
    const [isSwitcherOn, setIsSwitcherOn] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [isUploadError, setIsUploadError] = useState(false)
    const [isLoader, setIsLoader] = useState(false)


    const handleUploadError = () => {
        setIsLoader(false);
        setIsUploadError(true);
        setFormData({
            ...formData,
            image: null
        })
        setImagePreview(null);
    }

    const handleLoader = (status) => setIsLoader(status)
    const handleNft = useHandleNFT({item, onRequestClose, callback, handleLoader, handleUploadError})

    const onInfoChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onItemCreate = async (img) => {
        setIsUploadError(false);

        const newFormData = new FormData()
        newFormData.append("image", img)

        await handleNft.mintNFT(newFormData)
    }

    const onInfoUpdate = async () => {
        setIsUploadError(false);

        await handleNft.updateNFTInfo({...formData, itemID: item?._id})
    }

    const onPhotoUpdate = async (img) => {
        setIsUploadError(false);

        const newFormData = new FormData()

        newFormData.append("image", img)
        newFormData.append("creator", item?.creator)
        newFormData.append("id", item?._id)

        await handleNft.updateNFTPhoto(newFormData, item)
    }

    return {
        formData,
        imagePreview,
        isUploadError,
        isLoader,
        isSwitcherOn,
        setIsSwitcherOn,
        onItemCreate,
        onInfoUpdate,
        onInfoChange,
        onPhotoUpdate,
    };
};

export default useHandleNftForm;