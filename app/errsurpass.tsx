'use client'

export default function DisableConsole() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    console.log = function() {};
                    console.warn = function() {};
                    console.error = function() {};
                    console.info = function() {};
                    console.debug = function() {};
                    console.trace = function() {};
                `,
            }}
        />
    )
}
