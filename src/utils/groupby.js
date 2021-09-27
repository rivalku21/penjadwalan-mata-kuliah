module.exports = {
    groupBy:(key, array) => {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var added = false;
            for (var j = 0; j < result.length; j++) {
                if (result[j][key] == array[i][key]) {
                    result[j].list_mahasiswa.push(array[i].list_mahasiswa);
                    added = true;
                    break;
                }
            }
            if (!added) {
                var entry = {list_mahasiswa: []};
                entry['id'] = array[i]['id'];
                entry['nama_matkul'] = array[i]['nama_matkul'];
                entry[key] = array[i][key];
                entry['nama_dosen'] = array[i]['nama_dosen'];
                entry['jadwal'] = array[i]['jadwal'];
                entry.list_mahasiswa.push(array[i].list_mahasiswa);
                result.push(entry);
            }
        }
        return result;
    }
}