interface SidebarProps {
    filename: string
}

const Sidebar = ({ filename }: SidebarProps): JSX.Element => {
    switch (filename) {
        case 'timemachine':
            return (
                <aside>
                    <h4>Trapped in the Time Machine</h4>
                    <p>
                        One of Windrift's founding design principles is that it should support
                        "mutable" content, or content that can shift, sometimes dramatically, in
                        response to user input.
                    </p>
                    <p>
                        A story that demonstrates this is{' '}
                        <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a>{' '}
                        (2019), which was developed using an earlier version of the library. This
                        short piece demonstrates a similar concept.
                    </p>
                </aside>
            )

        default:
            return null
    }
}

export default Sidebar
