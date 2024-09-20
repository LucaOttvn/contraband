import React from 'react';
import { TailSpin } from 'react-loader-spinner'
import TextStagger from "../components/TextStagger";
interface LoaderProps { }

export default function Loader(props: LoaderProps) {

    return (
        <div className="w-full h-full center gap-3">
            <TailSpin
                visible={true}
                height="18"
                width="18"
                color="var(--green)"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <div>
                <TextStagger text="Loading..." title={false} />
            </div>
        </div>
    );
}