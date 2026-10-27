import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  TextInput, SafeAreaView, Modal, Pressable, Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type Page = 'feed' | 'article' | 'saved';
type News = { id: number; source: string; badge: string; title: string; time: string; image: any; category: string; summary: string; };
const news: News[] = [
  { id: 1, source: 'Tecnoblog', badge: 'T', title: 'Inteligência artificial impulsiona novas ferramentas no mercado de trabalho', time: 'há 2 horas', image: require('../assets/laptop.jpg'), category: 'Tecnologia', summary: 'A inteligência artificial tem acelerado o desenvolvimento de novas ferramentas e mudado a forma como empresas e profissionais trabalham, trazendo mais produtividade e automatização de tarefas.' },
  { id: 2, source: 'G1', badge: 'G', title: 'Amazônia registra queda no desmatamento, aponta novo relatório', time: 'há 3 horas', image: require('../assets/forest.jpg'), category: 'Mundo', summary: 'Novo relatório aponta mudanças importantes nos indicadores ambientais e reforça a importância do acompanhamento contínuo da região.' },
  { id: 3, source: 'Folha de S.Paulo', badge: 'F', title: 'Brasil avança em conectividade e supera 90% de acesso à internet', time: 'há 5 horas', image: require('../assets/phone.jpg'), category: 'Brasil', summary: 'O acesso à internet continua crescendo no país, ampliando as possibilidades de comunicação, educação e trabalho.' },
  { id: 4, source: 'InfoMoney', badge: 'i', title: 'Ibovespa fecha em alta com avanço de ações de tecnologia', time: 'há 6 horas', image: require('../assets/chart.jpg'), category: 'Economia', summary: 'O mercado encerrou o dia em alta, com destaque para o desempenho de empresas ligadas ao setor de tecnologia.' },
];
const related = [
  { source: 'UOL', title: 'Como a IA está transformando o futuro do trabalho', image: require('../assets/future.jpg'), time: 'há 4 horas' },
  { source: 'Exame', title: 'Profissões do futuro: as habilidades mais valorizadas', image: require('../assets/work.jpg'), time: 'há 6 horas' },
];
const teal = '#087d84';
const darkTeal = '#075b63';

export function FeedScreen() {
  const [page, setPage] = useState<Page>('feed');
  const [selected, setSelected] = useState<News>(news[0]);
  const [saved, setSaved] = useState<number[]>([1]);
  const [shareOpen, setShareOpen] = useState(false);
  const [category, setCategory] = useState('Todas');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const isSaved = (id:number) => saved.includes(id);
  const toggleSaved = (id:number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev,id]);
  const openArticle = (item:News) => { setSelected(item); setPage('article'); };
  const visibleNews = news.filter(n => (category === 'Todas' || n.category === category) && (n.title.toLowerCase().includes(query.toLowerCase()) || n.source.toLowerCase().includes(query.toLowerCase())));
  const notify = (s:string) => { setToast(s); setTimeout(() => setToast(''), 1800); };

  const renderHeader = ({ title, back=false, actions=true }: {title:string; back?:boolean; actions?:boolean}) => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {back ? <TouchableOpacity onPress={() => setPage('feed')} style={styles.iconButton}><Ionicons name="arrow-back" size={23} color="#fff" /></TouchableOpacity> :
          <Ionicons name="wifi" size={21} color="#fff" style={{marginRight:9}} />}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        {actions && <TouchableOpacity onPress={() => notify('Busca selecionada')} style={styles.iconButton}><Ionicons name="search-outline" size={21} color="#fff" /></TouchableOpacity>}
        <TouchableOpacity onPress={() => notify('Mais opções')} style={styles.iconButton}><Ionicons name="ellipsis-vertical" size={19} color="#fff" /></TouchableOpacity>
      </View>
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => setPage('feed')}>
        <Ionicons name="home" size={20} color={page==='feed' ? teal : '#75868c'} />
        <Text style={[styles.navLabel,page==='feed' && styles.navActive]}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setPage('saved')}>
        <Ionicons name={page==='saved' ? 'bookmark' : 'bookmark-outline'} size={20} color={page==='saved' ? teal : '#75868c'} />
        <Text style={[styles.navLabel,page==='saved' && styles.navActive]}>Salvos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setShareOpen(true)}>
        <Ionicons name="share-social-outline" size={20} color="#75868c" />
        <Text style={styles.navLabel}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNewsCard = ({ item, compact=false }: {item:News; compact?:boolean}) => (
    <TouchableOpacity activeOpacity={0.85} style={[styles.newsCard, compact && styles.compactCard]} onPress={() => openArticle(item)}>
      <Image source={item.image} style={[styles.thumb, compact && styles.compactThumb]} />
      <View style={styles.newsText}>
        <View style={styles.sourceRow}>
          <View style={[styles.sourceBadge,{backgroundColor:item.source==='G1'?'#d82424':item.source==='Folha de S.Paulo'?'#176aa4':item.source==='InfoMoney'?'#075b8c':'#147ca4'}]}><Text style={styles.badgeText}>{item.badge}</Text></View>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text numberOfLines={compact ? 3 : 3} style={styles.newsTitle}>{item.title}</Text>
        {!compact && <Text style={styles.dots}>•••</Text>}
      </View>
      {page==='saved' ? <TouchableOpacity onPress={() => toggleSaved(item.id)} style={styles.cardAction}><Ionicons name="trash-outline" size={16} color="#60747a" /></TouchableOpacity> :
        <TouchableOpacity onPress={() => toggleSaved(item.id)} style={styles.cardAction}><Ionicons name={isSaved(item.id) ? 'bookmark' : 'bookmark-outline'} size={17} color={isSaved(item.id)?teal:'#60747a'} /></TouchableOpacity>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      {page === 'feed' && <>
        {renderHeader({ title: 'Pauta' })}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.searchWrap}><Ionicons name="search-outline" size={16} color="#71858b" /><TextInput value={query} onChangeText={setQuery} placeholder="Buscar notícias..." placeholderTextColor="#82939a" style={styles.searchInput} /></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {['Todas','Tecnologia','Mundo','Brasil','Economia'].map(c => <TouchableOpacity key={c} onPress={() => setCategory(c)} style={[styles.chip,category===c && styles.chipActive]}><Text style={[styles.chipText,category===c && styles.chipTextActive]}>{c}</Text></TouchableOpacity>)}
          </ScrollView>
          {visibleNews.map(item => <React.Fragment key={item.id}>{renderNewsCard({ item })}</React.Fragment>)}
        </ScrollView>
        {renderBottomNav()}
      </>}
      {page === 'article' && <>
        {renderHeader({ title: '', back: true, actions: false })}
        <ScrollView style={styles.articleScroll} showsVerticalScrollIndicator={false}>
          <Image source={selected.image} style={styles.heroImage} />
          <View style={styles.articleBody}>
            <View style={styles.sourceRow}>
              <View style={[styles.sourceBadge,{backgroundColor:'#147ca4'}]}><Text style={styles.badgeText}>{selected.badge}</Text></View>
              <Text style={styles.source}>{selected.source}</Text><Text style={styles.time}>{selected.time}</Text>
            </View>
            <Text style={styles.articleTitle}>{selected.title}</Text>
            <Text style={styles.articleSummary}>{selected.summary}</Text>
            <TouchableOpacity style={styles.readButton} onPress={() => notify('Abrindo matéria completa')}><Ionicons name="open-outline" size={16} color="#fff" /><Text style={styles.readButtonText}>Ler matéria completa</Text></TouchableOpacity>
            <View style={styles.relatedHead}><Text style={styles.relatedTitle}>Mais sobre este assunto</Text></View>
            {related.map((r,i)=><View style={styles.relatedItem} key={r.source}><Image source={r.image} style={styles.relatedImage}/><View style={{flex:1}}><View style={styles.sourceRow}><Text style={styles.source}>{r.source}</Text><Text style={styles.time}>{r.time}</Text></View><Text style={styles.relatedItemTitle}>{r.title}</Text></View></View>)}
          </View>
        </ScrollView>
      </>}
      {page === 'saved' && <>
        {renderHeader({ title: 'Salvos' })}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.searchWrap}><Ionicons name="search-outline" size={16} color="#71858b" /><TextInput value={query} onChangeText={setQuery} placeholder="Buscar nos salvos..." placeholderTextColor="#82939a" style={styles.searchInput} /></View>
          {news.filter(n => saved.includes(n.id) && (n.title.toLowerCase().includes(query.toLowerCase()) || n.source.toLowerCase().includes(query.toLowerCase()))).map(item => <React.Fragment key={item.id}>{renderNewsCard({ item, compact: true })}</React.Fragment>)}
          {saved.length===0 && <Text style={styles.empty}>Suas notícias salvas aparecerão aqui.</Text>}
        </ScrollView>
        {renderBottomNav()}
      </>}
      {toast!=='' && <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>}
      <Modal visible={shareOpen} transparent animationType="slide" onRequestClose={() => setShareOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShareOpen(false)}>
          <Pressable style={styles.shareSheet} onPress={() => {}}>
            <View style={styles.handle} />
            <View style={styles.sharePreview}>
              <Image source={selected.image} style={styles.previewImage} />
              <View style={{flex:1}}><Text numberOfLines={2} style={styles.previewTitle}>{selected.title}</Text><Text style={styles.previewUrl}>tecnoblog.net</Text></View>
            </View>
            <View style={styles.shareApps}>
              <TouchableOpacity onPress={() => notify('WhatsApp selecionado')} style={styles.appItem}><View style={[styles.appCircle,{backgroundColor:'#18c766'}]}><Ionicons name="logo-whatsapp" size={24} color="#fff" /></View><Text style={styles.appLabel}>WhatsApp</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => notify('Telegram selecionado')} style={styles.appItem}><View style={[styles.appCircle,{backgroundColor:'#219bd7'}]}><FontAwesome5 name="telegram-plane" size={23} color="#fff" /></View><Text style={styles.appLabel}>Telegram</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => notify('Gmail selecionado')} style={styles.appItem}><View style={styles.gmailCircle}><Text style={{fontSize:21,fontWeight:'800',color:'#d94841'}}>M</Text></View><Text style={styles.appLabel}>Gmail</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => notify('Mais opções')} style={styles.appItem}><View style={[styles.appCircle,{backgroundColor:'#e9eef1'}]}><MaterialCommunityIcons name="dots-horizontal" size={24} color="#52646b" /></View><Text style={styles.appLabel}>Mais</Text></TouchableOpacity>
            </View>
            <View style={styles.shareOptions}>
              <TouchableOpacity style={styles.shareOption} onPress={() => {setShareOpen(false);notify('Link copiado')}}><Ionicons name="link-outline" size={18} color="#52656c"/><Text style={styles.optionText}>Copiar link</Text><Ionicons name="copy-outline" size={18} color="#52656c" /></TouchableOpacity>
              <TouchableOpacity style={styles.shareOption} onPress={() => notify('Compartilhamento aberto')}><Ionicons name="share-social-outline" size={18} color="#52656c"/><Text style={styles.optionText}>Compartilhar via...</Text><Ionicons name="share-outline" size={18} color="#52656c" /></TouchableOpacity>
              <TouchableOpacity style={styles.shareOption} onPress={() => {setShareOpen(false);notify('Salvo no dispositivo')}}><Ionicons name="download-outline" size={18} color="#52656c"/><Text style={styles.optionText}>Salvar no dispositivo</Text><Ionicons name="download-outline" size={18} color="#52656c" /></TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f5f8fa',paddingTop:Platform.OS==='android'?0:0},
  header:{height:57,backgroundColor:darkTeal,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:15},
  headerLeft:{flexDirection:'row',alignItems:'center',flex:1},
  headerTitle:{color:'#fff',fontSize:18,fontWeight:'700',letterSpacing:.1},
  headerRight:{flexDirection:'row',alignItems:'center'},
  iconButton:{padding:6,marginLeft:7},
  content:{flex:1,paddingHorizontal:13,backgroundColor:'#f4f7f9'},
  searchWrap:{height:38,marginTop:10,marginBottom:9,borderRadius:22,backgroundColor:'#fff',borderWidth:1,borderColor:'#e2e9ed',flexDirection:'row',alignItems:'center',paddingHorizontal:12},
  searchInput:{flex:1,paddingVertical:0,paddingLeft:8,fontSize:12,color:'#23343a'},
  categories:{flexGrow:0,marginBottom:10},
  chip:{paddingHorizontal:11,paddingVertical:6,backgroundColor:'#eaf0f3',borderRadius:18,marginRight:6},
  chipActive:{backgroundColor:teal},
  chipText:{fontSize:11,color:'#33474d',fontWeight:'500'},
  chipTextActive:{color:'#fff'},
  newsCard:{backgroundColor:'#fff',borderRadius:10,padding:10,marginBottom:9,flexDirection:'row',alignItems:'flex-start',minHeight:91,shadowColor:'#203b44',shadowOpacity:.035,shadowRadius:4,elevation:1},
  compactCard:{minHeight:100,paddingVertical:12,marginBottom:9},
  thumb:{width:52,height:52,borderRadius:7,marginRight:9,backgroundColor:'#d7e1e4'},
  compactThumb:{width:53,height:53},
  newsText:{flex:1,paddingTop:1},
  sourceRow:{flexDirection:'row',alignItems:'center',marginBottom:4},
  sourceBadge:{width:14,height:14,borderRadius:3,alignItems:'center',justifyContent:'center',marginRight:5},
  badgeText:{fontSize:9,color:'#fff',fontWeight:'800'},
  source:{fontSize:9.5,color:'#43545a',fontWeight:'600',flexShrink:1},
  time:{fontSize:8.5,color:'#91a0a5',marginLeft:'auto'},
  newsTitle:{fontSize:11.2,lineHeight:15.2,color:'#172a30',fontWeight:'600'},
  dots:{fontSize:10,color:'#84949a',marginTop:3,letterSpacing:1},
  cardAction:{paddingLeft:5,paddingTop:3},
  bottomNav:{height:57,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e7ecef',flexDirection:'row',justifyContent:'space-around',alignItems:'center',paddingBottom:3},
  navItem:{alignItems:'center',justifyContent:'center',minWidth:62},
  navLabel:{fontSize:9,color:'#75868c',marginTop:2},
  navActive:{color:teal,fontWeight:'700'},
  articleScroll:{flex:1,backgroundColor:'#fff'},
  heroImage:{width:'100%',height:190,resizeMode:'cover',backgroundColor:'#dbe5e7'},
  articleBody:{paddingHorizontal:17,paddingTop:13,paddingBottom:24},
  articleTitle:{fontSize:20,lineHeight:25,fontWeight:'800',color:'#1b2b30',marginTop:5,marginBottom:8},
  articleSummary:{fontSize:13,lineHeight:19,color:'#687980',marginBottom:16},
  readButton:{height:41,borderRadius:24,backgroundColor:teal,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8},
  readButtonText:{color:'#fff',fontSize:12,fontWeight:'700'},
  relatedHead:{borderTopWidth:1,borderTopColor:'#e6ecef',marginTop:16,paddingTop:15,marginBottom:8},
  relatedTitle:{fontSize:12,fontWeight:'800',color:'#26383d'},
  relatedItem:{flexDirection:'row',paddingVertical:9,borderBottomWidth:1,borderBottomColor:'#edf1f3',gap:9},
  relatedImage:{width:57,height:54,borderRadius:7},
  relatedItemTitle:{fontSize:11.5,lineHeight:15,fontWeight:'600',color:'#25373c',marginTop:3},
  empty:{textAlign:'center',color:'#788a90',marginTop:35,fontSize:13},
  modalBackdrop:{flex:1,backgroundColor:'rgba(0,0,0,0.42)',justifyContent:'flex-end'},
  shareSheet:{backgroundColor:'#fff',borderTopLeftRadius:19,borderTopRightRadius:19,paddingHorizontal:16,paddingTop:8,paddingBottom:20,minHeight:340},
  handle:{width:38,height:4,borderRadius:4,backgroundColor:'#cbd4d8',alignSelf:'center',marginBottom:14},
  sharePreview:{flexDirection:'row',alignItems:'center',paddingBottom:15,borderBottomWidth:1,borderBottomColor:'#edf0f2',gap:10},
  previewImage:{width:44,height:44,borderRadius:7},
  previewTitle:{fontSize:11.5,lineHeight:15,fontWeight:'700',color:'#27373c'},
  previewUrl:{fontSize:10,color:'#8a999e',marginTop:3},
  shareApps:{flexDirection:'row',justifyContent:'space-between',paddingVertical:17},
  appItem:{alignItems:'center',width:'23%'},
  appCircle:{width:39,height:39,borderRadius:10,alignItems:'center',justifyContent:'center'},
  gmailCircle:{width:39,height:39,borderRadius:10,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e8ecef'},
  appLabel:{fontSize:9.5,color:'#506269',marginTop:5},
  shareOptions:{borderTopWidth:1,borderTopColor:'#edf0f2',paddingTop:5},
  shareOption:{flexDirection:'row',alignItems:'center',height:39,gap:10},
  optionText:{fontSize:11,color:'#43565c',flex:1},
  toast:{position:'absolute',bottom:70,alignSelf:'center',backgroundColor:'#26383d',paddingHorizontal:16,paddingVertical:10,borderRadius:20},
  toastText:{color:'#fff',fontSize:12},
});
