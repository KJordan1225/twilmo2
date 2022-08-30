import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />
    
            <ValidationErrors errors={errors} />
    
            <form onSubmit={submit}>
                <div className="pb-4 border-b">
                    <Label forInput="name" value="Name" />
    
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
    
                    <Label forInput="address1" value="Address 1" />
    
                    <Input
                        type="text"
                        name="address1"
                        value={data.address1}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="address1"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
    
                    <Label forInput="address2" value="Address 2" />
    
                    <Input
                        type="text"
                        name="address2"
                        value={data.address2}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="address2"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
    
                    <Label forInput="city" value="City" />
    
                    <Input
                        type="text"
                        name="city"
                        value={data.city}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="city"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
    
                    <Label forInput="state" value="State" />
    
                    <Input
                        type="text"
                        name="state"
                        value={data.state}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="state"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
    
                    <Label forInput="zip" value="Zip" />
    
                    <Input
                        type="text"
                        name="zip"
                        value={data.zip}
                        className="mt-1 mb-4 block w-full"
                        autoComplete="zip"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
    
    
                </div>
    
                <div className="mt-4">
                    <Label forInput="email" value="Email" />
    
                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
    
                <div className="mt-4">
                    <Label forInput="password" value="Password" />
    
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
    
                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password" />
    
                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
    
                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>
    
                    <Button className="ml-4" processing={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
    
}
