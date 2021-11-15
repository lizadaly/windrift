import { Nav } from 'core/components'

interface SidebarProps {
    filename: string
}

const Sidebar = ({ filename }: SidebarProps): JSX.Element => {
    switch (filename) {
        case 'timemachine':
            return (
                <aside>
                    <h4>Trapped in your time machine!</h4>
                    <p>
                        One of Windrift's design principles is that it should support "mutable"
                        stories, with content that can shift, sometimes dramatically, in response to
                        user input. This can be complement linear storytelling (where the plot moves
                        forward in time) or entirely supplant it.
                    </p>
                    <p>
                        An extreme form of mutable story is{' '}
                        <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a>{' '}
                        (2019), developed using an earlier version of Windrift, where the entire
                        plot is present on-screen at all times but shifts in-place based on user
                        choice.
                    </p>
                    <p>
                        This short piece demonstrates a hybrid concept—the plot moves forward (and
                        backward!) through time, but can also be read end-to-end as a complete
                        narrative at each time step. Both the text content and the imagery are
                        responsive to the world state.
                    </p>
                    <h4>Demos</h4>
                    <ul>
                        <li>
                            <Nav text="Trapped in your time machine!" next="timemachine" />
                        </li>
                        <li>
                            <Nav text="A House of Dust" next="house-of-dust" />
                        </li>
                    </ul>
                </aside>
            )

        default:
            return null
    }
}

export default Sidebar
