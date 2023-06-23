

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'


const Navbar = ({ isAdmin, loadVostfr, loadVf, setShowLastEpisodes }) => {

  const navigation = useNavigation()
  // const [isAdminv, setIsAdminv] = useState(false)
  // setIsAdminv(isAdmin)

  const handleLastEpisodesClick = () => {
    setShowLastEpisodes(true);
  };

  const gotoAdmin = async () => {
    navigation.navigate('AdminScreen')
  }

  return (
    <>
      { isAdmin && (
      <View>
        <TouchableOpacity style={{ padding:10, backgroundColor:'cyan', borderRadius:5 }} onPress={gotoAdmin}>
          <Text>
            Admin
          </Text>
        </TouchableOpacity>
      </View>
      ) }
      <View style={styles.navbar}>
        <View style={styles.navbarList}>
          <TouchableOpacity onPress={loadVostfr} style={styles.navbarItem}>
            <Text style={styles.navbarLink}>Anime VOSTFR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loadVf} style={styles.navbarItem}>
            <Text style={styles.navbarLink}>Anime VF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLastEpisodesClick} style={[styles.navbarItem, styles.lastNavbarItem]}>
            <Text style={styles.navbarLink}>Dernières sorties</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 9999,
  },
  navbarList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navbarItem: {
    flex: 1,
    marginRight: 16,
  },
  lastNavbarItem: {
    marginRight: 0,
  },
  navbarLink: {
    color: '#333333',
    textDecorationLine: 'none',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbarLinkHover: {
    color: '#ff0000',
  },
});

export default Navbar;
