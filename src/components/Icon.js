
const Icon = ({ name }) => {

    switch (name) {
        case 'arrow-down':
            return (
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l4 4 4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/>
                </svg>
            )
        case 'arrow-left':
            return (
                <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L2 5l4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/>
                </svg>
            )
        case 'arrow-up':
            return (
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/>
                </svg>
            )
        case 'check':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                    <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1"/>
                </svg>
            )
        case 'hamburger':
            return (
                <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#FFF" fill-rule="evenodd"><path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z"/></g>
                </svg>
            )
        case 'close':
            return (
                <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z" fill="#FFF" fill-rule="evenodd"/>
                </svg>
            )
        case 'comments':
            return (
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fill-rule="nonzero"/>
                </svg>
            )
        case 'edit-feedback':
            return (
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a">
                            <stop stop-color="#E84D70" offset="0%"/>
                            <stop stop-color="#A337F6" offset="53.089%"/>
                            <stop stop-color="#28A7ED" offset="100%"/>
                        </radialGradient>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <circle fill="url(#a)" cx="20" cy="20" r="20"/>
                        <path d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z" fill="#FFF" fill-rule="nonzero"/>
                    </g>
                </svg>
            )
        case 'new-feedback':
            return (
                <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a">
                            <stop stop-color="#E84D70" offset="0%"/>
                            <stop stop-color="#A337F6" offset="53.089%"/>
                            <stop stop-color="#28A7ED" offset="100%"/>
                        </radialGradient></defs>
                    <g fill="none" fill-rule="evenodd">
                        <circle fill="url(#a)" cx="28" cy="28" r="28"/>
                        <path fill="#FFF" fill-rule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"/>
                    </g>
                </svg>
            )
        case 'plus':
            return (
                <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
                    <text transform="translate(-24 -20)" fill="#F2F4FE" fill-rule="evenodd" font-family="Jost-Bold, Jost" font-size="14" font-weight="bold">
                        <tspan x="24" y="27.5">+</tspan>
                    </text>
                </svg>
            )
    }

}

export default Icon