import React                          from 'react'
import {View, StyleSheet, Linking}    from 'react-native'
import {Text}                         from 'react-native-elements'
import {bindActionCreators}           from 'redux'
import {connect}                      from 'react-redux'
import WebView                        from 'react-native-webview'
import {MarkdownView}                 from 'react-native-markdown-view'
import Alert                          from '../components/Alert'
import AsyncContent                   from '../components/AsyncContent'
import Image                          from '../components/Image'
import Overlay                        from '../components/Overlay'
import AudioPlayer                    from '../components/AudioPlayer'
import {fetchArticle}                 from '../redux/actions/resources'
import {getYoutubeEmbedLink, getFile} from '../utils/common'
import Button                         from './Button'

class Article extends React.Component {
  state = {
    articleSections: [],
    openingLink: null,
  }

  componentDidUpdate() {
    if (this.props.article && !this.state.articleSections.length) {
      const articleSections = this.props.article.article_sections
      articleSections.sort((a, b) => a.order > b.order)
      this.setState({
        articleSections,
      })
    }
  }

  componentDidMount() {
    const {id} = this.props
    this.props.fetchArticle(id)
  }

  render() {
    return (
      <View>
        <AsyncContent
          loading={this.props.loadingArticle}
          error={this.props.loadingArticleError}
        >
          {this.state.articleSections.map(section => (
            <View
              key={section.id}
              style={styles.contentSection}
            >
              {section.type === 'text' && (
                <MarkdownView
                  blacklist={['lists']}
                  styles={markdownStyles}
                  onLinkPress={url => this.setState({openingLink: url})}
                >
                  {section.content}
                </MarkdownView>
              )}
              {section.type === 'video' && (
                getYoutubeEmbedLink(section.content) ? (
                  <WebView
                    style={styles.sectionVideo}
                    source={{uri: getYoutubeEmbedLink(section.content)}}
                  />
                ) : (
                  <Alert message="Could not load video"/>
                )
              )}
              {['gif', 'image'].includes(section.type) && (
                <Image
                  style={styles.sectionImage}
                  resizeMode="contain"
                  source={getFile(section.file.id)}
                />
              )}
              {section.type === 'audio' && (
                <AudioPlayer
                  source={getFile(section.file.id)}
                  type="button"
                  buttonTextPlaying="Pause Instructions"
                  buttonTextStopped="Play Audio Instructions"
                  loadingSpinnerStyle={{marginLeft: 'auto', marginRight: 'auto'}}
                />
              )}
            </View>
          ))}
        </AsyncContent>

        <Overlay
          isVisible={!!this.state.openingLink}
          hasAction={false}
          dismissible={false}
        >
          <View>
            <View style={{marginBottom: 16}}>
              <Text h2>You are leaving Expy Health</Text>
              <Text>
                The link you clicked on will take you to a site maintained by a third party, which is solely responsible
                for its content. Expy Health Inc. does not control, influence, or endorse this site, and the opinions,
                claims, or comments expressed on this site should not be attributed to Expy Health, Inc. Expy Health, Inc
                is not responsible for the privacy policy of any third-party websites. We encourage you to read the
                privacy policy of every website you visit.
              </Text>
              <Text>
                Click "Continue" to leave app or "Return to Expy Health" to close this window and return to the Expy
                Health Patient App
              </Text>
            </View>

            <Button
              title="Continue"
              containerStyle={{marginBottom: 16,}}
              onPress={() => {
                Linking.openURL(this.state.openingLink).catch(error =>
                  console.warn('An error occurred: ', error),
                )
              }}
            />

            <Button
              title="Return to Expy Health"
              type="outline"
              onPress={() => this.setState({openingLink: null})}
            />
          </View>
        </Overlay>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentSection: {
    marginBottom: 24,
  },
  sectionVideo: {
    width: '100%',
    height: 300,
  },
  sectionImage: {
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

const markdownStyles = {
  paragraph: {
    fontSize: 18,
    lineHeight: 26,
  },
  listItemOrderedContent: {
    fontSize: 18,
    lineHeight: 26,
  },
  listItemUnOrderedContent: {
    fontSize: 18,
    lineHeight: 26,
  },
  listItemNumber: {
    minWidth: 20,
    fontSize: 18,
    lineHeight: 26,
  },
  listItemBullet: {
    minWidth: 20,
    fontSize: 18,
    lineHeight: 26,
  },
}

const mapStateToProps = ({resources: resourcesStore}) => ({
  // ARTICLE
  article: resourcesStore.article,
  loadingArticle: resourcesStore.loadingArticle,
  loadingArticleError: resourcesStore.errorArticle,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchArticle,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Article)
