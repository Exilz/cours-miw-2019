import React, { Component } from 'react';
import Router from 'next/router';

interface IProps {}
interface IState {
    cameraIndex: 0 | 1;
    camerasCount?: number;
    error?: boolean;
}

export default class Scanner extends Component<IProps, IState> {

    codeReader: any;

    constructor (props: IProps) {
        super(props);
        this.state = { cameraIndex: 0 };
        this.switchCamera = this.switchCamera.bind(this);
    }

    componentDidMount () {
        // setTimeout(() => {
        //     this.onProductScanned('1000000');
        // }, 2500);
        this.setupScanner();
    }

    async setupScanner () {
        if (typeof window === 'undefined') {
            return;
        }
        const Zxing = require('@zxing/library');
        try {
            const { cameraIndex } = this.state;
            this.codeReader = new Zxing.BrowserBarcodeReader();
            const cameras = await this.codeReader.getVideoInputDevices();
            console.log('cameras', cameras);
            if (!cameras || !cameras.length) {
                return this.setState({ camerasCount: cameras.length, error: true });
            } else {
                this.setState({ camerasCount: cameras.length });
            }
            this.codeReader.decodeFromInputVideoDevice(
                cameras[cameraIndex].deviceId,
                this.refs.video
            ).then((result: any) => {
                this.onProductScanned(result.text);
            }).catch((err: Error) => {
                console.warn('Scanning error', err);
            });
        } catch (err) {
            console.warn(err);
            this.setState({ error: true });
        }
    }

    onProductScanned (barCode: string) {
        Router.push({ pathname: '/Product', query: { barCode } });
    }

    switchCamera () {
        this.setState(
            { cameraIndex: this.state.cameraIndex === 0 ? 1 : 0 },
            () => {
                this.codeReader && this.codeReader.reset();
            }
        );
    }

    get switchCameraBtn () {
        if (!this.state.camerasCount || this.state.camerasCount < 2) {
            return null;
        }
        return (
            <div className={'Scanner--switchCamera'} onClick={this.switchCamera}>
                <i className={'fas fa-sync'} />
            </div>
        );
    }

    render () {
        if (this.state.error) {
            const msg = this.state.camerasCount === 0 ? 'Aucune caméra trouvée' : "Erreur lors de l'initialisation du scan";
            return (
                <div className={'Scanner--container'}>
                    <div className={'Scanner--errorMsg'}>{ msg }</div>
                </div>
            );
        }
        return (
            <div className={'Scanner--container'}>
                { this.switchCameraBtn }
                <video ref={'video'} className={'Scanner--video'} />
            </div>
        );
    }
}
