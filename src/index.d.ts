declare module 'OTPField' {
    import * as React from 'react';

    export interface OTPFieldProps {
        value?: string;
        onChange?: Function;
        otpLength?: number;
        tintColor?: string;
        offTintColor?: string;
        containerStyle?: Object;
        cellStyle?: Object;
        defaultValue?: string;
        editable?: boolean;
    }

    export default class OTPField extends React.Component<OTPFieldProps, any> {
        render(): JSX.Element;
    }
}

