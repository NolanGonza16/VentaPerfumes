import unittest

from scripts.match_fragrance_sources import notes


class SourceNotesTests(unittest.TestCase):
    def test_multiple_note_tiers_inside_one_block(self):
        source = {
            "body": """
            <div class="notesfinal">
              <p><strong>Top Notes</strong><br>Saffron, Black Tea</p>
              <p><strong>Middle Notes</strong><br>Suede, Leather, Incense</p>
              <p><strong>Base Notes</strong><br>Vanilla, Amberwood, Musk</p>
            </div>
            """
        }
        self.assertEqual(
            notes(source),
            {
                "salida": ["Saffron", "Black Tea"],
                "corazon": ["Suede", "Leather", "Incense"],
                "fondo": ["Vanilla", "Amberwood", "Musk"],
            },
        )

    def test_store_copy_is_removed_from_base_notes(self):
        source = {
            "body": (
                "Opening with Lemon and Lime, the heart reveals Iris, "
                "resting on a base of Musk and Ambroxan Available in: 0."
            )
        }
        self.assertEqual(notes(source)["fondo"], ["Musk", "Ambroxan"])


if __name__ == "__main__":
    unittest.main()
