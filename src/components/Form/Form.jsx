import React,{useEffect,useCallback,useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './Form.css';
function Form({ onSave, editingUser, onCancel }) {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const options = useMemo(() => countryList().getData(), []);
    const initialFormState = useMemo(() => ({
        name: '',
        email: '',
        password: '',
        aadharcard: '',
        pancard: '',
        votercard: '',
        country: null,
        phone: '',
        state: '',
        pincode: '',
        region: '',
        latitude: '',
    }), []);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        onSave(data);
        reset(initialFormState);
    };

    useEffect(() => {
        if (editingUser) {
            reset(editingUser);
        } else {
            reset(initialFormState);
        }
    }, [editingUser, reset, initialFormState]);

    const handleFormReset = useCallback(() => {
        if (editingUser) {
            reset(editingUser);
        } else {
            reset(initialFormState);
        }
    }, [editingUser, reset, initialFormState]);

    useEffect(() => {
        handleFormReset();
    }, [handleFormReset]);

    const handleCancel = (event) => {
        event.preventDefault();
        console.log('Cancel button clicked');
        reset(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="container">
                <h1 style={{ textAlign: 'left' }} className='heading_details'>Enter Your Details:</h1>
                <div className="fields">
                    <div className="name_field">
                        <div className="name_details">
                        <label>Name:</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.name && <div className="error-message" style={{color:'red'}}>*{errors.name.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                    <div className="name_details">
                        <label>Email:</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.email && <div className="error-message" style={{color:'red'}}>*{errors.email.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                    <div className="name_details">
                        <label>Password:</label>

                        <input
                            type="password"
                            {...register('password', { 
                                required: 'Password is required',
                                minLength:{
                                    value:8,
                                    message:'Password must be at least 8 characters long'
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                    message: 'Password must contain at least one uppercase letter, one number, and one special character'
                                }
                             })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.password && <div className="error-message" style={{color:'red'}}>*{errors.password.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                    <div className="name_details">
                        <label>Aadhar Card:</label>
                        <input
                            type="number"
                            {...register('aadharcard', { required: 'Aadhar Card is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.aadharcard && <div className="error-message" style={{color:'red'}}>*{errors.aadharcard.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                    <div className="name_details">
                        <label>Pan Card:</label>
                        <input
                            type="text"
                            {...register('pancard', { required: 'Pan Card is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.pancard && <div className="error-message" style={{color:'red'}}>*{errors.pancard.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>Voter Id Card:</label>
                        <input
                            type="text"
                            {...register('votercard', { required: 'VoterId Card is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.votercard && <div className="error-message" style={{color:'red'}}>*{errors.votercard.message}</div>}
                        </div>
                    </div>
                    <div className="name_field country">
                    <div className="name_details">
                        <label>Country:</label>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: 'Country is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={options}
                                    onChange={(option) => field.onChange(option)}
                                    value={field.value}
                                />
                            )}
                        />
                        </div>
                        <div className="error-message">
                        {errors.country && <div className="error-message" style={{color:'red'}}>*{errors.country.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{3}[0-9]{3}[0-9]{4}$/,
                                    message: 'Phone number is reqired'
                                }
                            })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.phone && <div className="error-message" style={{color:'red'}}>*{errors.phone.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>State:</label>
                        <input
                            type="text"
                            {...register('state', { required: 'State is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.state && <div className="error-message" style={{color:'red'}}>*{errors.state.message} </div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>Pincode:</label>
                        <input
                            type="number"
                            {...register('pincode', { required: 'Pincode is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.pincode && <div className="error-message" style={{color:'red'}}>*{errors.pincode.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>Region:</label>
                        <input
                            type="text"
                            {...register('region', { required: 'Region is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.region && <div className="error-message" style={{color:'red'}}>*{errors.region.message}</div>}
                        </div>
                    </div>
                    <div className="name_field">
                        <div className="name_details">
                        <label>Latitude:</label>
                        <input
                            type="text"
                            {...register('latitude', { required: 'Latitude is required' })}
                        />
                        </div>
                        <div className="error-message">
                        {errors.latitude && <div className="error-message" style={{color:'red'}}>*{errors.latitude.message}</div>}
                        </div>
                    </div>
                </div>
                <div className="btn_field">
                    <button type="submit">
                        {editingUser ? 'Update' : 'Save'}
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
export default Form;